import QRCode from "qrcode.react";

export default function QR_Code() {
  return (
    <div className="center">
        <tacenter><h1>Share the QR Code below to verify yourself.</h1></tacenter>
        <br/>
        <br/>
        <QRCode
        value={"USER"}
        size={300}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={false}
        renderAs={"svg"}
        imageSettings={{
            src: "https://ucarecdn.com/8c0fc087-a6db-400d-bbee-a6d571e02824/qrimageyellow.png",
            x: null,
            y: null,
            height: 80,
            width: 80,
            excavate: true,
        }}
        />
    </div>
  )
}
