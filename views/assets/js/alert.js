
//  Checking if payload is complete
document.getElementById('submitTutor').addEventListener('click', () => {
    const tutor = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        description: document.getElementById('description').value,
        image: document.getElementById('image').value,
    }
    if (tutor.name === '' || tutor.email === '' || tutor.phone === '' || tutor.subject === '' || tutor.description === '' || tutor.image === '') {
        toastr.error("Please Fill All", "Bottom Right", {
            positionClass: "toast-bottom-center",
            timeOut: 5e3,
            closeButton: !0,
            debug: !1,
            newestOnTop: !0,
            progressBar: !0,
            preventDuplicates: !0,
            onclick: null,
            showDuration: "300",
            hideDuration: "1000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
            tapToDismiss: !1
        })
    } 
})