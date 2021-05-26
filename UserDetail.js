import React, { useEffect, useState } from 'react';

function Userdetail() {
    const [users, setUsers] = useState([]);
    const [searchname, setSearchName] = useState("");
    const [results,setResults]=useState([]);
    const [loading,setLoading] =useState(true);
    const[error,setError] =useState('');
    
    useEffect(() => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response)=>response.json())
        .then((data)=>{
            setLoading(false);
            setUsers(data);
            setResults(data)})
        .catch((e)=>{
        setLoading(false);
        setError('fetch failed');
        });
    }, []);

    useEffect(()=>{
        if(searchname !==0){
            const filtereddata = users.filter(user => {
                return user.name.toLowerCase().includes(searchname)||
                user.address.street.toLowerCase().includes(searchname) ||
                user.address.city.toLowerCase().includes(searchname) ||
                user.address.suite.toLowerCase().includes(searchname);
                 }) ;
    
                 setResults(filtereddata);
        }
        else{
            setResults(users);
        }
    },[searchname]);

    const handlesearch = event => {
        setSearchName(event.target.value);  
    }

    if(loading){
        return <p>loading..</p>
    }
    if(error !== ''){
        return <p>Error : {error}</p>
    }

    return (
        <>
            <div className="main_container">
                <input className="search_user_name" type="text" value={searchname} onChange={(event) => handlesearch(event)}></input>
                <div className="row_data">
                    {
                        results.map((user) => {
                             return (
                                <div className="card_detail" key={user.id}>
                                    <h3 className="user_profile_id">User profile {user.id}</h3>
                                    <div className="main_detail_user_name">
                                    <h3 className="user_personal_detail">Personal</h3>
                                    <h4 className="user_name_title">Name</h4>
                                    <p className="user_name">{user.name}</p>
                                    <h4 className="user_firstname_title">UserName</h4>
                                    <p className="user_firstname">{user.username}</p>
                                    </div>
                                    <div className="user_contact_detail">
                                    <h3 className="user_contact_title">Contact</h3>
                                    <h4 className="user_email_title">Email</h4>
                                    <div className="user_email">{user.email}</div>
                                    <h4 className="user_contact_no">Contact No.</h4>
                                    <div className="user_phonenumber">{user.phone}</div>
                                    <h4 className="user_website_title">Website</h4>
                                    <div className="user_websitename">{user.website}</div>
                                    <h4 className="user_address_title">Address</h4>
                                    <div className="user_city">
                                 <span>{user.address.suite}, {user.address.street}, {user.address.city}</span>
                                 </div>
                                 <div className="user_company_detail">
                                    <h3 className="user_company_name">Company</h3>
                                 <h4 className="user_company_title">Company Name</h4>
                                    <div className="user_companyname">{user.company.name}</div>
                                    </div>

                                 </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Userdetail;