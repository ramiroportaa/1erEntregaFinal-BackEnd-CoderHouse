const form = document.querySelector("form");
form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    let obj = {}
    data.forEach((value,key) => obj[key]=value);
    await addProductAPI(obj);
});