// back_forward_handling.js

(function () {
  window.onpageshow = function(event) {
      if (event.persisted) {
          window.location.reload(true);
      }
  };
})();





// Add a new state to the history stack

// history.pushState(null, null, '/page1');

// // Replace the current state in the history stack
// history.replaceState(null, null, '/page2');


// var request = document.getElementById("request");
// var response = document.getElementById("response");
// var responseBody= document.getElementById("responseBody");
// var requestBody= document.getElementById("requestBody");
// var login =document.getElementById("login");

// request.addEventListener("click",postrequestBody);
// response.addEventListener("click",postresponseBody);
// login.addEventListener("click",authenticate)

// function postrequestBody(){
//     if(requestBody.style.width=='0px'){
//     requestBody.style.width='500px';
//     requestBody.style.height='400px';
//     requestBody.style.backgroundColor='white';
//     requestBody.style.border='solid 1px';
//     requestBody.style.opacity='0.5';
//     request.style.color='white';

//     responseBody.style.width='0px';
//     responseBody.style.height='0px';
//     responseBody.style.backgroundColor='none';
//     responseBody.style.border='none';
//     responseBody.style.opacity='0';
//     response.style.color='rgb(154, 228, 80)';
//     }
//     else{
//     requestBody.style.width='0px';
//     requestBody.style.height='0px';
//     requestBody.style.backgroundColor='none';
//     requestBody.style.border='none';
//     requestBody.style.opacity='0';
//     request.style.color='rgb(154, 228, 80)';
//     }

// }
// function postresponseBody(){
//     if(responseBody.style.width=='0px'){
//         responseBody.style.width='500px';
//         responseBody.style.height='400px';
//         responseBody.style.backgroundColor='white';
//         responseBody.style.border='solid 1px';
//         responseBody.style.opacity='0.5';
//         response.style.color='white';

//         requestBody.style.width='0px';
//         requestBody.style.height='0px';
//         requestBody.style.backgroundColor='none';
//         requestBody.style.border='none';
//         requestBody.style.opacity='0';
//         request.style.color='rgb(154, 228, 80)';
//     }
//     else{
//         responseBody.style.width='0px';
//         responseBody.style.height='0px';
//         responseBody.style.backgroundColor='none';
//         responseBody.style.border='none';
//         responseBody.style.opacity='0';
//         response.style.color='rgb(154, 228, 80)';
//     }

//   }

//account
function toggleAccountOptions() {
  var accountOptions = document.getElementById('accountOptions');
  accountOptions.classList.toggle('show');
}
//logout



//login Form
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('#loginForm'); 
  if (!form) {
      console.error('Form element not found');
  } else {
      form.addEventListener('submit', async function(e) {
          e.preventDefault(); // Prevent the form from submitting normally
          const formData = new FormData(form);
          const email = formData.get('email');
          const password = formData.get('password');
          const page="home"
          localStorage.setItem('page',page)
          await authenticate(email, password);
          console.log(email);
          console.log(password);
          await getAuthenticateRedirect();
          
      });
  }
});
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('#patientEditForm'); 
  if (!form) {
      console.error('Form element not found');
  } else {
      form.addEventListener('submit', async function(e) {
          e.preventDefault(); // Prevent the form from submitting normally
          const formData = new FormData(form);
          const email = formData.get('email');
          const firstName = formData.get('firstName');
          const lastName = formData.get('lastName');
          const id = formData.get('id');
          const mobileNumber = formData.get('mobileNumber');
          const age = formData.get('age');
          const gender = formData.get('gender');
          localStorage.setItem('page','home')
          patchPatient(email,firstName,lastName,mobileNumber,age,gender,id);
          console.log(gender);
          console.log(firstName);
      });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('#newPatientForm'); 
  if (!form) {
      console.error('Form element not found');
  } else {
      form.addEventListener('submit', async function(e) {
          e.preventDefault(); // Prevent the form from submitting normally
          const formData = new FormData(form);
          const email = formData.get('email');
          const firstName = formData.get('firstName');
          const lastName = formData.get('lastName');
          const mobileNumber = formData.get('mobileNumber');
          const age = formData.get('age');
          const gender = formData.get('gender');
          localStorage.setItem('page','home')
          addPatient(email,firstName,lastName,mobileNumber,age,gender);
          console.log(gender);
          console.log(firstName);
      });
  }
});


 //calling patient view end point
 async function redirectToPatientView(patientId) {
  try {
   
   console.log(patientId);
    // Fetch patient data by id
    const patientData = await fetchPatientById(patientId);
      
     
     

    if (patientData!=null) {
      //getting patientComorbidities
      const patientComorbiditiesData= await fetchPatientComorbiditiesById(patientId);
      console.log(patientComorbiditiesData);

      //getting patientDisabilities
      // const patientDisabilitiesData =await fetchPatientDisabilitiesById(patientId);
      // console.log(patientDisabilitiesData);
      //getting patientVitals
      // const patientVitalsData = await fetchPatientVitalsById(patientId);

      //getting patient Comments
      // const patientCommentsData = await fetchPatientCommentsById(patientId);
      
      //getting comorbidities

      // const comorbiditiesData =await fetchAllComorbidities();

      //getting disabilities
      // const disabilitiesData = await fetchAllDisabilities();
      


      const patientViewData = {
        patientData: patientData,
        patientComorbiditiesData: patientComorbiditiesData
      };
  
      const url = `patientView.html?patientViewData=${encodeURIComponent(JSON.stringify(patientViewData))}`;
      
      // Redirect to the patient view page with patient data as query parameter
      
      window.location.href = url;
    
    } else {
      console.error('Failed to fetch patient data');
    }
  } catch (error) {
    console.error('Error redirecting to patient view:', error.message);
  }
}
  


// document.getElementById('addPatientbutton').addEventListener('click', async function(event) {
//   // Prevent the default form submission behavior
//   event.preventDefault();

//   // Extract patient information from the form fields
//   const email = document.getElementById('email').value;
//   const firstName = document.getElementById('firstName').value;
//   const lastName = document.getElementById('lastName').value;
//   const mobileNumber = document.getElementById('mobileNumber').value;
//   const age = document.getElementById('age').value;
//   const gender = document.getElementById('gender').value;

//   // Call the addPatient function with the extracted information
//   try {
//       await addPatient(email, firstName, lastName, mobileNumber, age, gender);
//   } catch (error) {
//       console.error('Error adding patient:', error);
//   }
// });
// document.addEventListener("DOMContentLoaded", function() {
//   const patientViewForm = document.querySelector('#patientView'); 
//   if (!patientViewForm) {
//       console.error('Form element not found');
//   } else {
//       patientViewForm.addEventListener('submit', async function(e) { // Corrected 'form' to 'patientViewForm'
//           e.preventDefault(); // Prevent the form from submitting normally
//           const formData = new FormData(patientViewForm);
//           const id = formData.get('id');
//           const firstName = formData.get('firstName');
//           const email = formData.get('email');
//           const lastName = formData.get('lastName');
//           const age = formData.get('age');
//           const gender = formData.get('gender');
//           const mobileNumber = formData.get('contact');
        
//           window.location.href = `patientView.html?id=${id}&firstName=${firstName}&lastName=${lastName}&email=${email}&age=${age}&gender=${gender}&mobileNumber=${mobileNumber}`; // Removed unnecessary parenthesis
//       });
//     }
// });
// document.addEventListener("DOMContentLoaded", function() {
//   const patientEditForm = document.querySelector('#patientEdit'); 
//   console.log("patientEditForm:"+patientEditForm);
//   if (!patientEditForm) {
//       console.error('Form element not found');
//   } else {

//       patientViewForm.addEventListener('submit', async function(e) { // Corrected 'form' to 'patientViewForm'
//           e.preventDefault(); // Prevent the form from submitting normally
//           const formData = new FormData(patientEditForm);
//           console.log("FormData:"+formData);
//           const id = formData.get('id');
//           const firstName = formData.get('firstName');
//           const email = formData.get('email');
//           const lastName = formData.get('lastName');
//           const age = formData.get('age');
//           const gender = formData.get('gender');
//           const mobileNumber = formData.get('contact');
        
//           window.location.href = `patientEdit.html?id=${id}&firstName=${firstName}&lastName=${lastName}&email=${email}&age=${age}&gender=${gender}&mobileNumber=${mobileNumber}`; // Removed unnecessary parenthesis
//       });
//     }
// });


function redirectPatients(){
  const username=localStorage.getItem('username');
  const password=localStorage.getItem('password');
  localStorage.setItem('home','home');
  authenticate(username,password);
  fetchData(); 
}

function redirectComordities(){
  const username=localStorage.getItem('username');
  const password=localStorage.getItem('password');
  localStorage.setItem('home','home');
  authenticate(username,password);
  fetchComorbidityData(); 
}

function redirectDisabilities(){
  const username=localStorage.getItem('username');
  const password=localStorage.getItem('password');
  localStorage.setItem('home','home');
  authenticate(username,password);
  fetchDisabilityData(); 
}

function redirectVitals(){
  const username=localStorage.getItem('username');
  const password=localStorage.getItem('password');
  authenticate(username,password);
  fetchAllPatientsVitalsData(); 
  
}



async function authenticate(username, password) {
  const url = 'http://192.168.2.100:8080/api/authenticate';
  const bearertoken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTcwNzQ5NzEyNH0.fRgZD557PezoakVdvo9-8mx2ZYhQaJq2r67y1CmJSrU8kr2CMfzpWT2kiMSwHvEaTNl8HweqZO7N5X2-nfiiYQ';

  const requestBody = {
    username,
    password,
    rememberMe: true
  };

  try {
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': `Bearer ${bearertoken}`
      },
      mode :'cors',
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const data = await response.json();

    const token = data.id_token;
    localStorage.setItem('token', token);
    console.log('Authentication successful');

    const patientCount=fetchPatientCount();
    localStorage.setItem('patientCount', patientCount);
    localStorage.setItem('username',username);
    localStorage.setItem('password',password);
   
   
   
   
  } catch (error) {
    console.error('Error during authentication:', error.message);
  }
}

// check authenticate

async function getAuthenticateRedirect() {
  const url = 'http://192.168.2.100:8080/api/authenticate';
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to get authenticate');
    }
    window.location.href = 'home.html';   
  } catch (error) {
    console.error('Error redirecting home:', error.message);
  }
  
}


// Fetch function to get data from a protected endpoint
async function fetchData() {
  const token = localStorage.getItem('token');
  const patientCount=localStorage.getItem('patientCount');
 
  if (!token) {
    console.error('No token found');
    return;
  }

  const url = `http://192.168.2.100:8080/api/patients?page=0&size=${patientCount}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
     
    });

    if (!response.ok) {
      throw new Error('Failed to fetch patients');
    }

    const data = await response.json();
    console.log('Patients data:', data);
    console.log(data[0])
    console.log(data[0].id)
   
    const userDataString = JSON.stringify(data);
    localStorage.setItem('allPatientsData',userDataString)
    window.location.href = `patients.html?data=${encodeURIComponent(userDataString)}`;
  } catch (error) {
    console.error('Error fetching patients:', error.message);
  }
}

// Fetch function to get patients from a protected endpoint

async function fetchPatients() {
  const token = localStorage.getItem('token');
  const patientCount=localStorage.getItem('patientCount');
 
  if (!token) {
    console.error('No token found');
    return;
  }

  const url = `http://192.168.2.100:8080/api/patients?page=0&size=${patientCount}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
     
    });

    if (!response.ok) {
      throw new Error('Failed to fetch patients');
    }

    const data = await response.json();
    console.log('Patients data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching patients:', error.message);
  }
}


// Fetch function to get Comorbidity data from a protected endpoint
async function fetchComorbidityData() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found');
    return;
  }
  const comorbidityCount=await fetchComorbidityCount()
  const url = `http://192.168.2.100:8080/api/comorbidities?page=0&size=${comorbidityCount}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
     
    });

    if (!response.ok) {
      throw new Error('Failed to fetch patients');
    }

    const data = await response.json();
    console.log('Comorbidity data:', data);

    const userDataString = JSON.stringify(data);
   

    window.location.href = `comorbidities.html?data=${encodeURIComponent(userDataString)}`;

  } catch (error) {
    console.error('Error fetching comorbidities:', error.message);
  }
}

// Fetch function to get disabilities data from a protected endpoint
async function fetchDisabilityData() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found');
    return;
  }
  const disabilityCount=await fetchDisabilityCount()
  const url = `http://192.168.2.100:8080/api/disabilities?page=0&size=${disabilityCount}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
     
    });

    if (!response.ok) {
      throw new Error('Failed to fetch patients');
    }

    const data = await response.json();
    console.log('Disability data:', data);

    const userDataString = JSON.stringify(data);
   

    window.location.href = `disabilities.html?data=${encodeURIComponent(userDataString)}`;

  } catch (error) {
    console.error('Error fetching disability:', error.message);
  }
}

// Fetch function to get vitals data from a protected endpoint
async function fetchAllPatientsVitalsData() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found');
    return;
  }
  const vitalsCount=await fetchAllPatientsVitalsCount()
  const url = `http://192.168.2.100:8080/api/patient-vitals?page=0&size=${vitalsCount}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
     
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vitals');
    }

    const data = await response.json();
    console.log('vitals data:', data);

    const userDataString = JSON.stringify(data);
   

    window.location.href = `vitals.html?data=${encodeURIComponent(userDataString)}`;

  } catch (error) {
    console.error('Error fetching vitals:', error.message);
  }
}

//fetchnig patients count

async function fetchPatientCount() {
  const url = 'http://192.168.2.100:8080/api/patients/count';
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch patient count');
    }

    const data = await response.json();
    
    return data;
   
  } catch (error) {
    console.error('Error fetching patient count:', error.message);
  }
  
}

//fetchnig comorbidity count

async function fetchComorbidityCount() {
  const url = 'http://192.168.2.100:8080/api/comorbidities/count';
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch comorbidity count');
    }

    const data = await response.json();
    
    return data;
   
  } catch (error) {
    console.error('Error fetching Comorbidity count:', error.message);
  }
  
}

//fetchnig disability count

async function fetchDisabilityCount() {
  const url = 'http://192.168.2.100:8080/api/disabilities/count';
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch comorbidity count');
    }

    const data = await response.json();
    
    return data;
   
  } catch (error) {
    console.error('Error fetching Comorbidity count:', error.message);
  }
  
}

//fetchnig vitals count

async function fetchAllPatientsVitalsCount() {
  const url = 'http://192.168.2.100:8080/api/patient-vitals/count';
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vitals count');
    }

    const data = await response.json();
    
    return data;
   
  } catch (error) {
    console.error('Error fetching vitals count:', error.message);
  }
  
}

// patching patient

async function patchPatient(email,firstName,lastName,mobileNumber,age,gender,id) {
  const url = `http://192.168.2.100:8080/api/patients/${id}`;
  const token = localStorage.getItem('token');
  const requestBody = {
    
      "id": id,
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "gender": gender,
      "age": age,
      "mobileNumber": mobileNumber,
  };
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch patient count');
    }
    console.log(`patient got updated : ${id} ${firstName}`)
    const data = await response.json();

    redirectPatients();
   
  } catch (error) {
    console.error('Error patching patient:', error.message);
  }
  
}
// patching/edit comorbidity

async function editComorbidity(id,name) {
  const url = `http://192.168.2.100:8080/api/comorbidities/${id}`;
  const token = localStorage.getItem('token');
  console.log(name);
  const requestBody = {
     "id":id,
     "name":name
  };
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error('Failed to update  comorbidity');
    }
    console.log(`comorbidity got updated : ${name}`)
    const data = await response.json();

    
  } catch (error) {
    console.error('Error patching comorbidity:', error.message);
  }
  
}

// patching/edit disability

async function editDisability(id,name) {
  const url = `http://192.168.2.100:8080/api/disabilities/${id}`;
  const token = localStorage.getItem('token');
  console.log(name);
  const requestBody = {
     "id":id,
     "name":name
  };
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error('Failed to update  disability');
    }
    console.log(`disability got updated : ${name}`)
    const data = await response.json();

    
  } catch (error) {
    console.error('Error patching disability:', error.message);
  }
  
}

// patching/edit vitals

async function editVitals(id,pulseRate,bloodPressure,respiration,spo2) {
  const url = `http://192.168.2.100:8080/api/patient-vitals/${id}`;
  const token = localStorage.getItem('token');
  
  const requestBody = {
     "id":id,
     "pulseRate":pulseRate,
     "bloodPressure":bloodPressure,
     "respiration":respiration,
     "spo2":spo2,

  };
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error('Failed to update  vitals');
    }
    console.log(`vitals got updated : ${name}`)
    const data = await response.json();

    
  } catch (error) {
    console.error('Error patching vitals:', error.message);
  }
  
}


// adding new Patient

async function addPatient(email,firstName,lastName,mobileNumber,age,gender) {
  const url = "http://192.168.2.100:8080/api/patients";
  const token = localStorage.getItem('token');
  const requestBody = {
    
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "gender": gender,
      "age": age,
      "mobileNumber": mobileNumber
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });
     console.log(response.status);
      if(localStorage.username){
        localStorage.setItem('page','home');
        authenticate(localStorage.username,localStorage.password);
        fetchData(); 
      }
     
    if (response.status===201) {
      console.log(`patient got added : ${id} ${firstName}`)
      const data = await response.json();
      
      if(localStorage.getItem('page')==='home'){
        fetchData(); // Move fetchData() here
        }
     
    }
   else{
    throw new Error('Failed to add patient ');
   }
    
   
  } catch (error) {
    console.error('Error putting new patient:', error.message);
  }
  
}

//adding new comorbidity


async function addComorbidity(name) {
  const url = "http://192.168.2.100:8080/api/comorbidities";
  const token = localStorage.getItem('token');
  const requestBody = {
    
      "name": name,
     
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });
     
    if (response.status===201) {
      console.log('patient got added :'+name)
      const data = await response.json();
      
     
    }
   else{
    throw new Error('Failed to add comorbidity ');
   }
    
   
  } catch (error) {
    console.error('Error putting new comorbidity:', error.message);
  }
  
}


//adding new Disability

async function addDisability(name) {
  const url = "http://192.168.2.100:8080/api/disabilities";
  const token = localStorage.getItem('token');
  const requestBody = {
    
      "name": name,
     
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });
     
    if (response.status===201) {
      console.log('patient got added :'+name)
      const data = await response.json();
      
     
    }
   else{
    throw new Error('Failed to add comorbidity ');
   }
    
   
  } catch (error) {
    console.error('Error putting new comorbidity:', error.message);
  }
  
}


//  getting patient by id
async function fetchPatientById(patientId) {
  console.log(patientId);
  const url = `http://192.168.2.100:8080/api/patients/${patientId}`;
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    const patientData = await response.json();
    return patientData; 
  } catch (error) {
    console.error('Error fetching patient data:', error.message);
    return null;
}
}


//  getting patientComorbidities by patient id
async function fetchPatientComorbiditiesById(patientId) {
  console.log(patientId);
  const url = `http://192.168.2.100:8080/api/patient-comorbidities?patientId.equals=${patientId}&page=0&size=20`;
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    const patientComorbiditiesData = await response.json();
    return patientComorbiditiesData; 
  } catch (error) {
    console.error('Error fetching patient data:', error.message);
    return null;
}
}


//  getting patientDisabilities by patient id

async function fetchPatientDisabilitiesById(patientId) {
  console.log(patientId);
  const url = `http://192.168.2.100:8080/api/patient-disabilities?patientId.equals=${patientId}&page=0&size=20`;
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    const patientDisabilitiesData = await response.json();
    return patientDisabilitiesData; 
  } catch (error) {
    console.error('Error fetching patient data:', error.message);
    return null;
}
}

//  getting patientVitals by patient id

async function fetchPatientVitalsById(patientId) {
  console.log(patientId);
  const url = `http://192.168.2.100:8080/api/patient-vitals?patientId.equals=${patientId}&page=0&size=20`;
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    const PatientVitalsData = await response.json();
    return PatientVitalsData; 
  } catch (error) {
    console.error('Error fetching patient data:', error.message);
    return null;
}
}

//  getting patientComments by patient id

async function fetchPatientCommentsById(patientId) {
  console.log(patientId);
  const url = `http://192.168.2.100:8080/api/comments?patientId.equals=${patientId}&page=0&size=20`;
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    const PatientCommentsData = await response.json();
    return PatientCommentsData; 
  } catch (error) {
    console.error('Error fetching patient data:', error.message);
    return null;
}
}


//getting comorbidities
async function fetchAllComorbidities() {
  
  const url = `http://192.168.2.100:8080/api/comorbidities?page=0&size=10`;
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    const allComorbidities = await response.json();
    return allComorbidities; 
  } catch (error) {
    console.error('Error fetching comorbidities:', error.message);
    return null;
}
}

//getting comorbidity by id
async function fetchComorbidityById(id) {
  
  const url = `http://192.168.2.100:8080/api/comorbidities/${id}`;
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    const comorbidity = await response.json();
    return comorbidity; 
  } catch (error) {
    console.error('Error fetching comorbidity by id:', error.message);
    return null;
}
}



//getting vitals
async function fetchAllVitals() {
  
  const url = `http://192.168.2.100:8080/api/patient-vitals?page=0&size=10`;
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    const allVitals = await response.json();
    return allVitals; 
  } catch (error) {
    console.error('Error fetching vitals:', error.message);
    return null;
}
}

//getting disabilities

async function fetchAllDisabilities() {
  
  const url = `http://192.168.2.100:8080/api/disabilities?page=0&size=10`;
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    const allDisabilities = await response.json();
    return allDisabilities; 
  } catch (error) {
    console.error('Error fetching disabilities:', error.message);
    return null;
}
}

//getting disability by id
async function fetchDisabilityById(id) {
  
  const url = `http://192.168.2.100:8080/api/disabilities/${id}`;
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    const disability = await response.json();
    return disability; 
  } catch (error) {
    console.error('Error fetching disabilities by id:', error.message);
    return null;
}
}



//getting comments

async function fetchAllComments() {
  
  const url = `http://192.168.2.100:8080/api/comments?page=0&size=10`;
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    const allComments = await response.json();
    return allComments; 
  } catch (error) {
    console.error('Error fetching Comments:', error.message);
    return null;
}
}

//getting users

async function fetchAllUsers() {
  
  const url = `http://192.168.2.100:8080/api/users?page=0&size=10`;
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    const allUsers = await response.json();
    return allUsers; 
  } catch (error) {
    console.error('Error fetching Comments:', error.message);
    return null;
}
}

//posting patientComorbidity

async function addPatientComorbidity(patientId,patientComorbidityId) {
  const url = "http://192.168.2.100:8080/api/patient-comorbidities";
  const token = localStorage.getItem('token');
  const patientDataById =await fetchPatientById(patientId);
  const comorbidityById =await fetchComorbidityById(patientComorbidityId);

  console.log("patientDataById: "+patientDataById);
  console.log("comorbidityById: "+comorbidityById);

  const requestBody = {
      "patient": patientDataById,
      "comorbidity": comorbidityById
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });
     console.log(response.status);
       
     console.log(`patientComorbidity got added : ${id} ${firstName}`)
      const data = await response.json();
     
   
  } catch (error) {
    console.error('Error putting new patientComorbidity:', error.message);
  }
  
}

//posting patientDisability

async function addPatientDisability(patientId,patientDisabilityId) {
  const url = "http://192.168.2.100:8080/api/patient-disabilities";
  const token = localStorage.getItem('token');
  const patientDataById =await fetchPatientById(patientId);
  const disabilityById =await fetchDisabilityById(patientDisabilityId);

  console.log("patientDataById: "+patientDataById);
  console.log("disabilityById: "+disabilityById);

  const requestBody = {
      "patient": patientDataById,
      "disability": disabilityById
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });
     console.log(response.status);
       
     console.log(`patientDisabilty got added : ${id} ${firstName}`)
      const data = await response.json();
     
   
  } catch (error) {
    console.error('Error putting new patientDisabilty:', error.message);
  }
  
}

//posting patientVitals

async function addPatientVitals(patientId,pulseRate,bloodPressure,respiration,spo2) {
  const url = "http://192.168.2.100:8080/api/patient-vitals";
  const token = localStorage.getItem('token');
  const patientDataById =await fetchPatientById(patientId);


  console.log("patientDataById: "+patientDataById);
  const timeOfMeasurement = new Date().toISOString();

  const requestBody = {
      "pulseRate":pulseRate,
      "bloodPressure":bloodPressure,
      "respiration":respiration,
      "spo2":spo2,
      "timeOfMeasurement":timeOfMeasurement,
      "patient": patientDataById
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });
     console.log(response.status);
       
     console.log(`patientVitals got added : ${id} ${firstName}`)
      const data = await response.json();
     
   
  } catch (error) {
    console.error('Error putting new patientVitals:', error.message);
  }
  
}

//posting patientComment

async function addPatientComment(patientId,comment) {
  const url = "http://192.168.2.100:8080/api/comments";
  const token = localStorage.getItem('token');
  const patientDataById =await fetchPatientById(patientId);


  console.log("patientDataById: "+patientDataById);
 

  const requestBody = {
      "comment": comment,
      "patient": patientDataById
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });
     console.log(response.status);
       
     console.log(`patientComment got added : ${id} ${firstName}`)
      const data = await response.json();
     
   
  } catch (error) {
    console.error('Error putting new patientComment:', error.message);
  }
  
}

//posting new Vitals

async function addiVtals(pulseRate,bloodPressure,respiration,spo2,patientId) {

  const url = "http://192.168.2.100:8080/api/patient-vitals";
  const token = localStorage.getItem('token');
  const patientDataById =await fetchPatientById(patientId);


  console.log("patientDataById: "+patientDataById);
  const timeOfMeasurement = new Date().toISOString();

  const requestBody = {
      "pulseRate":pulseRate,
      "bloodPressure": bloodPressure,
      "respiration":respiration,
      "spo2": spo2,
      "timeOfMeasurement":timeOfMeasurement,
      "patient":patientDataById      
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });
     console.log(response.status);
       
     console.log(`new Vitals got added `)
      const data = await response.json();
     
   
  } catch (error) {
    console.error('Error putting `new Vitals:', error.message);
  }
  
}








