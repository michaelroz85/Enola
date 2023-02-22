const getUserdata = async (onRen) => {
    try {
      const response = await fetch(
        `http://localhost:5000/auth/get-user-data/`,{
          headers: {
            // "Access-Control-Allow-Origin": "*",
            // "Content-Type": "application/json",
            "Authorization": localStorage.token
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
          console.log(data.first_name, data.last_name);
          return <div onRen={data}/>
      }
    } catch (error) {
      console.log(error);
    }
     
  }

  export default getUserdata;