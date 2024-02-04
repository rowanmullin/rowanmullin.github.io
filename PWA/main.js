const updateTime = () => {
  const dom = document.querySelector(".time");
  const curDate = new Date();
  const dateStringParts = curDate.toLocaleString().split(" ");
  dateStringParts.splice(-1, 0, curDate.getMilliseconds().toString().padStart(3, '0'));
  dom.innerText = "Time: " + dateStringParts[0] + " " + dateStringParts[1] + "." + ((dateStringParts[2]/1000)*30).toFixed().padStart(2, "0") + " " + dateStringParts[3]
};

const updateLocation = async () => {
  const dom = document.querySelector(".location");
  if (navigator.geolocation) {
      try {
          const result = await new Promise((a, r) => navigator.geolocation.getCurrentPosition(a, r));
          dom.innerText = `Latitude: ${result.coords.latitude.toFixed(6)}\nLongitude: ${result.coords.longitude.toFixed(6)}`;
      } catch (e) {
          dom.innerText = `Failed to get Location: "${e.message}"`;
      }

      setTimeout(updateLocation, 3000);
  } else {
      dom.innerText = "Location not supported";
  }
};

updateLocation();
setInterval(updateTime, 1)