import Medal from "./Medal";

export default function Country(props) {
  const handleClick = () => {
    setGolds(gold + 1);
  };

  let medalCount =
    props.country.gold + props.country.silver + props.country.bronze;

  return (
    <>
      <div className="country-container">
        <div className="col-1">
          <h2>{props.country.name}</h2>
          <h3>
            {medalCount} Medal{medalCount != 1 ? "s" : ""}
          </h3>
          <button
            className="remove"
            onClick={() => props.removeCountry(props.country.id)}
          >
            Remove country
          </button>
        </div>
        <div className="col-1">
          {props.medals.current.map((medal) => (
            <Medal
              key={medal.id}
              medal={medal}
              country={props.country}
              incrementMedal={props.incrementMedal}
              decrementMedal={props.decrementMedal}
            />
          ))}
        </div>
      </div>
    </>
  );
}
