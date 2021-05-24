import React from 'react';
class UserDetail extends React.Component {
 
        state = {
            isLoading:true,
            users: [],
            apiUsers : [],
            // addsearch :[],
            inputvalue:'',
            error:null
        }    
        
    fetchUsers() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then((responseData) => {
                this.apiUsers = responseData;
                this.setState(
                    { apiUsers: responseData,
                    isLoading :false })
            }).catch(error=>this.setState({error,isLoading:false}));
    }

    componentDidMount() {
        this.fetchUsers();
    }

    handleusernamechange(event) {
        console.log(event.target.value);
        
        
        let filtereddata = this.state.apiUsers.filter(d => {
            let searchValue = d.name.toLowerCase();
                 return (d.address.street.toLowerCase().indexOf(event.target.value.toLowerCase()) !==-1
                  || d.address.city.toLowerCase().indexOf(event.target.value.toLowerCase()) !==-1
                  || d.address.suite.toLowerCase().indexOf(event.target.value.toLowerCase()) !==-1 
                  || searchValue.indexOf(event.target.value.toLowerCase()) !== -1)
             
        })
        
        // console.log(filtereddata);
        this.setState({ users: filtereddata,
        inputvalue:event.target.value 
    })
    }


    render() {

        const {users,isLoading,error,inputvalue,apiUsers} = this.state;
        return (
            <div className="main_container">
                <input className="search_user_name" type="text" value={inputvalue} onChange={this.handleusernamechange.bind(this)}></input>
                {error ? <p>{error.message}</p> : null}
                <div className="row_data">
                    {!isLoading ?(
                        (users.length !== 0 ?users:apiUsers).map((user) => {
                            return (
                                <div className="card_detail" key={user.id}>
                                    <div className="user_name">{user.name}</div>
                                    <div className="user_Fullname">{user.username}</div>
                                    <div className="user_email">{user.email}</div>
                                    <div className="user_phonenumber">{user.phone}</div>
                                    <div className="user_websitename">{user.website}</div>
                                    <div className="user_companyname">{user.company.name}</div>
                                    <div className="user_city">Address:
                                    <span>{user.address.suite},{user.address.street},{user.address.city}</span></div>
                                </div> );
                        })
                    ):( 
                        <h3>Loading...</h3>
                    )}
                </div>
            </div>
        )
    }

}

export default UserDetail;