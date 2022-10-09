
export default function promiseClick(button) {
  return new Promise(
    function(resolve, reject) {
      button.addEventListener("click", (evt) => {
        resolve(evt);
      },
      { once: true });
    }
  );
}