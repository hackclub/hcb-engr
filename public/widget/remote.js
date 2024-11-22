// src: /widget/blog.html
const frame = document.createElement("iframe");
frame.src = "/widget/blog.html";
frame.style.visibility = "hidden";
frame.style.position = "fixed";
frame.style.bottom = "0";
frame.style.right = "0";
frame.style.width = "1px";
frame.style.height = "1px";
frame.style.pointerEvents = "none";
document.body.appendChild(frame);

window.addEventListener("message", (event) => {
    // if (event.origin !== "https://bank.engineering") return;

    console.log({ message: event.data });
});