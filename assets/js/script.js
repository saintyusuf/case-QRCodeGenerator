
/* WHEN CLICK TO BUTTON, RUN FUNCTION */
document.querySelector('.qr button').onclick = generateQR

/* THE FUNCTION WHICH SENDS THE TEXT TO BACKEND AS AJAX FOR CREATING QR CODE */
function generateQR(){

    const text = document.querySelector('.qr input[name="text"]').value

    const ajax = new XMLHttpRequest()
    ajax.open('POST', '/generateQR', true)
    ajax.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
    ajax.send(JSON.stringify({text}))
    ajax.onreadystatechange = function(){
        if(ajax.readyState === 4){
            const response = JSON.parse(ajax.response)

            if(response.status == false){
                alert(response.message)
            } else{
                document.querySelector('.qr img').setAttribute('src', response.qr)
            }
        }
    }

}


