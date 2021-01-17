export function changeViewBox() {
    let mySVG = document.querySelector('.rsm-svg');
    const mediaQuery = window.matchMedia('(min-width: 680px)')
    //   console.log(mySVG);
    if(mySVG) {
        if(mediaQuery.matches) {
            mySVG.setAttribute("viewBox", "0 0 880 420");
        } else {
            mySVG.setAttribute("viewBox", "80 0 640 420");
        }
    } 
}

window.addEventListener("popstate", (e) => {
    window.history.back();
})
