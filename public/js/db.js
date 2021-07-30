// enable offline data
db.enablePersistence().catch(function (err) {
  if (err.code == "failed-precondition") {
    // probably multible tabs open at once
    console.log("persistance failed");
  } else if (err.code == "unimplemented") {
    // lack of browser support for the feature
    console.log("persistance not available");
  }
});

// real-time listener
db.collection("cars").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      renderCar(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      removeCar(change.doc.id);
    }
  });
});

// add new car
const form = document.querySelector("form");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (enableAdd) {
    const car = {
      brand: form.brand.value,
      model: form.model.value,
      price: form.price.value,
      imgUrl: carImgUrl,
    };

    db.collection("cars")
      .add(car)
      .catch((err) => console.log(err));

    clearForm();
  }
});
function clearForm() {
  form.brand.value = "";
  form.model.value = "";
  form.price.value = "";
  form.image.value = "";
}

// remove a car
const carContainer = document.querySelector(".cars");
carContainer.addEventListener("click", (evt) => {
  if (evt.target.tagName === "I") {
    const id = evt.target.getAttribute("data-id");
    //console.log(id);
    db.collection("cars").doc(id).delete();
  }
});
