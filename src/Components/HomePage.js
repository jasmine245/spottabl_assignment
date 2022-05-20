import React,{useEffect, useState} from 'react';
import "./HomePage.css";

const getDataFromLS = () => {
    const getData = localStorage.getItem('data');
    if(getData){
        return JSON.parse(getData);
    }
    else{
        return []
    }
}


function HomePage (){

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    const [data,setData] = useState(getDataFromLS());

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleAddDataSubmit = (e) =>{
        e.preventDefault();

        let addData = {
            name,
            email,
        }

        if(!name && !email){
            alert("enter name or email");
        }
        else if(name || email){
            setData([...data, addData]);
            setName('');
            setEmail('');
            setModal(!modal);
        }
    }

    useEffect(()=>{
        localStorage.setItem('data',JSON.stringify(data));
    },[data]);

    const deleteItem = (id) => {
        const updatedItems = data.filter((elem,ind) => {
            return ind !== id;
        });

        setData(updatedItems);
    }

    const [query, setQuery] = useState ("");

    const displayData = data.filter(user => user.name.includes(query) || user.email.includes(query)).map((addData,idn) => {
        return(
            <>
                <tr key={idn}>
                    <div className='data'>
                        <div className='initials'>
                            <td style={{}}>{addData.name.split(" ")[0].split("")[0]}{addData.name.split(" ")[addData.name.split(" ").length-1].split("")[0]}</td>
                        </div>
                        <div className='full-data-img'>
                            <div className='full-data'>
                                <td className='name'>{addData.name}</td><br/>
                                <td className='email'><p style={{display:"inline", color:"gray"}}>&bull;</p>&nbsp;{addData.email}</td>
                            </div>
                            <div className="trash">
                                <img src={require("../Images/trash.png")} alt="delete-logo" onClick={() => deleteItem(idn)} />    
                            </div>     
                        </div>
                    </div>    
                </tr>
            </>
        );
    })

    const refresh = () => {
        window.location.reload(false);
    }
    


    return(
        <>
            <div className='body'>
                <div className='header'>
                    <div>
                        <img src={require("../Images/1615143047817.jpg")} alt="logo" className='logo'/>
                    </div>
                    <div className='heading'>
                        <h2>YOUR SPOTTABL TEAM</h2>
                        <p className='para'>Spottabl supports you all throughout </p>
                    </div>
                </div>
                <div className='container'>
                    <div className='sub-container'>
                        <div className='head'>
                            <h1 className='h1'>Customer Success Managers</h1>
                            <input type="submit" name="submit" value="ADD CSM" className='submit' onClick={toggleModal}/>
                        </div>
                        <div className='input-field'>
                            <input type="text" name="search" placeholder='Search by name or email' className='search' onChange={(e)=> setQuery(e.target.value)}/>
                            <img src={require("../Images/refresh-button.png")} alt="refresh-logo" className='refresh' onClick={refresh}/>
                        </div>
                        <div className='display-data'>
                            {displayData}
                        </div>
                    </div>
                    {modal && (
                        
                        <div className='modal'>
                            <div className='overlay'>
                                 <div className='modal-content1'>
                                    <div className='container-modal'>
                                        Name:
                                        <input name="name" className='input' placeholder='Enter name' type="text" value={name} onChange={(e) => setName(e.target.value)}/><br/>
                                        Email:
                                        <input type="email" name="email" className='input' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                                        <button className='close-modal' onClick={toggleModal}>CANCEL</button> 
                                        <button className='close-modal' onClick={handleAddDataSubmit}>ADD CSM</button> 
                                    </div>
                                    
                                 </div>
                                 
                            </div>
                            </div>
        
                    )}
                </div>
            </div>
        </>
    );
}

export default HomePage;