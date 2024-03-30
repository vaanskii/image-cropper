let image = document.getElementById("image");
let aspectRatio = document.querySelectorAll(".aspect-ratio-button");
let downloadButton = document.getElementById("download");
const fileInput = document.getElementById("file");
const previewImage = document.getElementById("preview-image");
const heightInput = document.getElementById("height-input");
const widthInput = document.getElementById("width-input");
const previewButton = document.getElementById("preview");
const options = document.querySelector(".options")

let cropper = "";
let fileName = "";

fileInput.onchange = () => {
    previewImage.src = "";
    heightInput.value = 0;
    widthInput.value = 0;
    downloadButton.classList.add("hide");


    let reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.onload = () => {
        image.setAttribute("src", reader.result);
        if (cropper) {
            cropper.destroy();
        }
        cropper = new Cropper(image);
        options.classList.remove("hide");
        previewButton.classList.remove("hide");
    };
    fileName = fileInput.files[0].name.split(".")[0];
};

aspectRatio.forEach((element) => {
    element.addEventListener("click", () => {
        if(element.innerText == "Free") {
            cropper.setAspectRatio(NaN)
        }else{
            cropper.setAspectRatio(eval(element.innerText.replace(":", "/")));
        }
    })
});

heightInput.addEventListener("input", () => {
    const {height} = cropper.getImageData();
    if(parseInt(heightInput.value) > Math.round(height)) {
        heightInput.value = Math.round(height);
    }
    let newHeight = parseInt(heightInput.value);
    cropper.setCropBoxData({height:newHeight});
});

widthInput.addEventListener("input", () => {
    const {width} = cropper.getImageData();
    if(parseInt(widthInput.value) > Math.round(width)) {
        widthInput.value = Math.round(width);
    }
    let newWidth = parseInt(widthInput.value);
    cropper.setCropBoxData({width:newWidth});
});

previewButton.addEventListener("click", (e) => {
    e.preventDefault();
    downloadButton.classList.remove("hide");
    let imgSrc = cropper.getCroppedCanvas({}).toDataURL();

    previewImage.src = imgSrc;
    downloadButton.download = `cropped_${fileName}.png`;
    downloadButton.setAttribute('href', imgSrc);
});

window.onload = () => {
    download.classList.add("hide");
    options.classList.add("hide");
    previewButton.classList.add("hide");
}