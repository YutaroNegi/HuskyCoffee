getPrices()
getName()
checkout()
finalPageName()
btn()
login()
modifyItem()


function getName() { //get user name

    $("#userNameBtn").click(() => {
        if ($("#userName").val() == "" || $("#userName").val() == null) {
            warningCard()
        } else {
            let userName = $("#userName").val()
            sessionStorage.setItem("name", userName)
            window.location.href = './menu.html';

        }
    })
}

function checkout() {// saves user order to session
    $("#checkoutBtn").click(() => {
        let coffee = $("#dripCoffeeValue").val()
        let iceCoffee = $("#iceCoffeeValue").val()
        let cookie = $("#cookieValue").val()
        let cake = $("#cakeValue").val()

        if ((coffee < 0 || iceCoffee < 0 || cookie < 0 || cake < 0) || (coffee == 0 && iceCoffee == 00 && cookie == 0 && cake == 0)) {
            warningCard()
            return
        }

        sessionStorage.setItem("coffee", coffee)
        sessionStorage.setItem("iceCoffee", iceCoffee)
        sessionStorage.setItem("cookie", cookie)
        sessionStorage.setItem("cake", cake)
        window.location.href = './checkout.html'
    })
}

function showPrice() {//show price after checkout page is loaded
    if (window.location.href.match('./checkout.html') != null) {
        db.collection("menu").doc("items").onSnapshot((doc) => {

            let coffeePrice = Number(sessionStorage.getItem("coffee")) * Number(doc.data().coffee)
            let iceCoffeePrice = Number(sessionStorage.getItem("iceCoffee")) * Number(doc.data().iceCoffee)
            let cookiePrice = Number(sessionStorage.getItem("cookie")) * Number(doc.data().cookie)
            let cakePrice = Number(sessionStorage.getItem("cake")) * Number(doc.data().cake)
            let total = coffeePrice + iceCoffeePrice + cookiePrice + cakePrice


            if (coffeePrice > 0) {
                $("#dripCoffeeCheckout").text(`${sessionStorage.getItem("coffee")}x Drip Coffee: ${coffeePrice}$`)
            } else {
                $("#dripCoffeeCheckout").text("")
            }


            if (iceCoffeePrice > 0) {
                $("#iceCoffeCheckout").text(`${sessionStorage.getItem("iceCoffee")}x Ice Coffee: ${iceCoffeePrice}$`)
            } else {
                $("#iceCoffeCheckout").text("")
            }


            if (cookiePrice > 0) {
                $("#cookieCheckout").text(`${sessionStorage.getItem("cookie")}x Cookie: ${cookiePrice}$`)
            } else {
                $("#cookieCheckout").text("")
            }


            if (cakePrice > 0) {
                $("#cakeCheckout").text(`${sessionStorage.getItem("cake")}x Cake: ${cakePrice}$`)
            } else {
                $("cakeCheckout").text("")
            }

            $("#totalCheckout").text(`Total: ${total}$`)
        });




    }

}

function btn() {//added buttons function 
    $('#payBtn').click(() => {
        window.location.href = './final.html';
    })
    $('#backMenuBtn').click(() => {
        window.location.href = './menu.html';
    })

}

function finalPageName() {//show user name at finish
    let userName = sessionStorage.getItem("name")
    if (window.location.href.match('./final.html') != null) {
        $("#callName").text(`We will call you soon ${userName}!`)
    }
}

function warningCard() {// show a warning card to fill the void input
    $("#dimScreen").addClass("d-flex")
    $("#dimScreen").removeClass("d-none")

    $("#warningName").addClass("d-flex")
    $("#warningName").removeClass("d-none")

    $('#okBtn').click(() => {

        $("#dimScreen").removeClass("d-flex")
        $("#dimScreen").addClass("d-none")

        $("#warningName").removeClass("d-flex")
        $("#warningName").addClass("d-none")
    })
}

function getPrices() {//get the prices from the database
    db.collection("menu").doc("items").onSnapshot((doc) => {
        $("#dripCoffePriceDisplay").text(`${doc.data().coffee}$`)
        $("#iceCoffePriceDisplay").text(`${doc.data().iceCoffee}$`)
        $("#cookiePriceDisplay").text(`${doc.data().cookie}$`)
        $("#cakePriceDisplay").text(`${doc.data().cake}$`)
    });

    showPrice()
}

function login() { //Login
    $('#loginBtn').click(() => {
        email = $('#login').val()
        pass = $('#password').val()

        auth.signInWithEmailAndPassword(email, pass)
            .then((userCredential) => {

                $("#admLoginDiv").removeClass("d-flex")
                $("#admLoginDiv").addClass("d-none")

                $("#modifyItem").removeClass("d-none")
                $("#modifyItem").addClass("d-flex")

            })
            .catch((error) => {
                $("#loginFailMsg").removeClass("d-none")
            });
    })
}

function modifyItem() { //modify the price of the menu
    $("#modifyBtn").click(() => {
        if (($("#coffeeNew").val() == "0") || ($("#coffeeNew").val() == "") || ($("#coffeeNew").val() == 0)) {
            console.log("unchanged");
        } else {

            db.collection("menu").doc("items").update({
                coffee: $("#coffeeNew").val()
            })
                .then(() => {
                    $("#coffeeConfirm").text(`coffee price changed to ${$("#coffeeNew").val()}`)
                    console.log("sucess");
                   
                })
                .catch((error) => {
                    console.log("error: ", error);
                })
        }

        if ($("#iceNew").val() != 0 || $("#iceNew").val() != "") {
            db.collection("menu").doc("items").update({
                iceCoffee: $("#iceNew").val()
            })
                .then(() => {
                    console.log("sucess");
                    $("#iceConfirm").text(`ice coffee price changed to ${$("#iceNew").val()}`)
                })
                .catch((error) => {
                    console.log("error: ", error);
                })
        } else {
            console.log("unchanged");
        }

        if ($("#cookieNew").val() != 0 || $("#cookieNew").val() != "") {
            db.collection("menu").doc("items").update({
                cookie: $("#cookieNew").val()
            })
                .then(() => {
                    console.log("sucess");
                    $("#cookieConfirm").text(`coffe price changed to ${$("#cookieNew").val()}`)
                })
                .catch((error) => {
                    console.log("error: ", error);
                })
        } else {
            console.log("unchanged");
        }

        if ($("#cakeNew").val() != 0 || $("#cakeNew").val() != "") {
            db.collection("menu").doc("items").update({
                cake: $("#cakeNew").val()
            })
                .then(() => {
                    console.log("sucess");
                    $("#cakeConfirm").text(`coffe price changed to ${$("#cakeNew").val()}`)
                })
                .catch((error) => {
                    console.log("error: ", error);
                })
        } else {
            console.log("unchanged");
        }
    })
}