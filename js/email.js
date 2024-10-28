function sendEmail(){
    let params = {
        name: document.getElementById("nameInput").value,
        email: document.getElementById("emailInput").value,
        phone: document.getElementById("phoneInput").value,
        category: document.getElementById("categoryInput").value,
        dateToFollowUp: document.getElementById("dateInput").value,
        message: document.getElementById("messageInput").value

    }


const serviceId = "service_6xokj0g";
const templeId = "template_qrwmoa5";

emailjs.send(serviceId, templeId, params).then(
    res=>{
        document.getElementById("nameInput").value = '';
        document.getElementById("emailInput").value = '';
        document.getElementById("phoneInput").value ='';
        document.getElementById("categoryInput").value = '';
        document.getElementById("dateInput").value = '';
        document.getElementById("messageInput").value = ''
        console.log(res);
        alert(`Your request for a quote was submitter sucessfully`)
    }
).catch((err)=>console.log(err));

}
