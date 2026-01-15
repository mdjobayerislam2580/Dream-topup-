function order() {
  fetch("/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      player: document.getElementById("player").value,
      package: document.getElementById("pkg").value
    })
  })
  .then(r => r.json())
  .then(d => alert(d.msg));
}
