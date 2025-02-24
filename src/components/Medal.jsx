export default function Medal(props) {
  let emoji = "";

  if (props.medal.name.toLowerCase() == "gold") {
    emoji = "🥇";
  } else if (props.medal.name.toLowerCase() == "silver") {
    emoji = "🥈";
  } else if (props.medal.name.toLowerCase() == "bronze") {
    emoji = "🥉";
  }

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <h3>
        {emoji} {capitalizeFirstLetter(props.medal.name)} Medals -{" "}
        <span>{props.country[props.medal.name]}</span>
      </h3>
      <div style={{ display: "flex" }}>
        <button
          className={
            props.country[props.medal.name] ? "increment remove" : "no-outline"
          }
          disabled={!props.country[props.medal.name]}
          onClick={() =>
            props.decrementMedal(props.country.id, props.medal.name)
          }
        >
          -
        </button>
        <button
          className="increment success"
          onClick={() =>
            props.incrementMedal(props.country.id, props.medal.name)
          }
        >
          +
        </button>
      </div>
    </div>
  );
}
