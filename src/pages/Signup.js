import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Logo from "../images/images.png";
import axios from "axios";
import { Link } from "react-router-dom";

//MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// const styles = (theme) => ({
//   ...theme
// });

const styles = (theme) => {
  console.log("hye yoiwej")
  console.log(theme)
  return {...theme.spreadIt}
}

// const styles = {
//   form: {
//     textAlign: "center",
//   },
//   image: {
//     margin: "20px auto 20px auto",
//   },
//   pageTitle: {
//     margin: "10px auto 10px auto",
//   },
//   textField: {
//     margin: "10px auto 10px auto",
//   },
//   button: {
//     marginTop: 50,
//     position: "relative",
//   },
//   customError: {
//     color: "red",
//     fontSize: "0.8rem",
//     marginTop: 10,
//   },
//   progress: {
//     position: "absolute",
//   },
// }


class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword:"",
      handle: "",
      loading: false,
      errors: {},
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    console.log("inside submitto");
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      userHandle: this.state.handle,

    };
    console.log(newUserData)
    console.log(newUserData.email);
    console.log(newUserData.password);
    axios
      .post("/signup", newUserData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('FBIdToken',`Bearer ${res.data.token}`)
        console.log("heyo");
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log("yoyoyoy");
        console.log(err.response.data);
        console.log(err);
        console.log(err.response.data.password);
        this.setState({
          errors: err.response.data,
          loading: false,
        });
        console.log(this.state.errors);
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    // console.log(event.target.name)
    // console.log(event.target.value)
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={Logo} alt="monkey" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            SignUp
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            ></TextField>
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            ></TextField>
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword }
              onChange={this.handleChange}
              fullWidth
            ></TextField>
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            ></TextField>
            {errors.error && (
              <Typography variant="body2" className={classes.customError}>
                {errors.error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              SignUp
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Already have an account? login <Link to="/login ">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
      //   {/* // <div>
      //   //     <h1>Login page</h1>
      //   // </div> */}
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
