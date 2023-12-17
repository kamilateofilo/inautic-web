// styles.js
const styles = {
  circularProgress: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "nowrap",
    padding: 10,
    justifyContent: "space-around",
    fontSize: 1,
    marginLeft: -5,
    marginTop: -130,
  },

  title: {
    flexDirection: "row",
    fontSize: 10,
    fontWeight: "normal",
    marginBottom: 20,
  },

  progressBar: {
    height: 30,
    width: "50%",
    backgroundColor: "white",
    padding: 2,
    borderWidth: 3,
    borderColor: "#ddd",
    marginTop: 220,
    marginBottom: -340,
    marginLeft: -40,
  },
  progressBarContainer: {
    display: "flex",
    transform: "rotate(-90deg)",
    width: 180,
    marginLeft: -90,
    marginBottom: 140,
  },
};

export default styles;
