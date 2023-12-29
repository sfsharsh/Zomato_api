const QRCode = require('qrcode')


let data = {
    name: "Employee Name",
    age: 27,
    department: "Police",
    id: "aisuoiqu3234738jdhf100223"
}

let stringdata = JSON.stringify(data)
console.log(stringdata)
QRCode.toString(stringdata, { type: 'terminal' },
    function (err, QRcode) {
        if (err) return console.log("error occurred")

        console.log(QRcode)
    }
)
