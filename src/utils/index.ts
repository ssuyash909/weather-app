export function getBrowserGeoPosition() : Promise <object> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject("error");
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      return resolve({ latitude, longitude })
    });
  });
}

export function getRoundOffTemp(kTemp : number) : number {
  const cTemp = kTemp - 273;
  return Math[cTemp < 0 ? 'ceil' : 'floor'](cTemp * 100) / 100;
}
