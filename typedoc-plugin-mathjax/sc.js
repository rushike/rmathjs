function mathjaxAlignLeftAll() {
  const all = document.querySelectorAll("mjx-container[jax='CHTML'][display='true']");
  for(let i = 0; i < all.length; i++) {
    all[i].style.textAlign = "left";
  }  
}

window.onload = () => {
  mathjaxAlignLeftAll();
}