import React, { useState, useCallback, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import BarChartIcon from "@material-ui/icons/BarChart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Button from "@material-ui/core/Button";
import GridLayout from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import CloseIcon from "@material-ui/icons/Close";
import vegaEmbed from "vega-embed";
import Axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import MenuItem from "@material-ui/core/MenuItem";
import Cookies from "universal-cookie";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const makeid = length => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return "Untitled_" + result;
};

var uid = makeid(6);
var layout1 = {};

var port = "http://localhost:8000";

var passenger_url = `${port}/visual/horizon/?r=1`;

const ResponsiveGridLayout = WidthProvider(Responsive);
var datajson = {
  todos: [
    {
      taskID: "a",
      task: "Boarding Gates"
    },
    {
      taskID: "b",
      task: "Passenger Footfall"
    },
    {
      taskID: "c",
      task: "Available Parking"
    }
  ],
  closedTasks: [
    {
      taskID: "d",
      task: "Baggage Belts"
    }
  ],
  draggedTasks: [
    {
      taskID: "e",
      task: "Baggage Belts"
    }
  ]
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 22 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

export default function Dashboard() {
  const [options, setOptions] = useState([]);

  const cookies = new Cookies();

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [dashname, setDashname] = useState(uid);

  const [layouts, setLayouts] = useState([]);

  const onLayoutChange = layout => {
    setLayouts(layout);
    layout1 = layout;
    savedatabase();
  };

  const [todos, setTodos] = useState(datajson.todos);
  const [closedTasks, setClosedTasks] = useState(datajson.closedTasks);
  const [draggedTasks, setDraggedTasks] = useState(datajson.draggedTasks);

  const onDrag = (event, todo) => {
    setDraggedTasks([...draggedTasks, todo]);
    var index = todos.findIndex(i => i.taskID == todo.taskID);
    todos.splice(index, 1);
  };

  const onClose = (event, todo) => {
    var index = draggedTasks.findIndex(i => i.taskID == todo.taskID);
    draggedTasks.splice(index, 1);
    setClosedTasks([...closedTasks, todo]);
  };

  const onDragAgain = (event, todo) => {
    setDraggedTasks([...draggedTasks, todo]);
    var index = closedTasks.findIndex(i => i.taskID == todo.taskID);
    closedTasks.splice(index, 1);
  };

  const onDragOver = () => {};
  const onDrop = event => {};

  function search(arr_, id, p) {
    for (var j = 0; j < arr_.length; j = j + 1) {
      if (arr_[j].i === id) {
        if (p == "h") {
          if (arr_[j].h > 1) {
            return arr_[j].h * 350;
          }
          return arr_[j].h * 280;
        }
        if (arr_[j].w > 1) {
          return arr_[j].w * 380;
        }
        return arr_[j].w * 260;
      }
    }
  }

  const [RT, setRT] = useState(true);

  const handleChangeRT = () => {
    var i = RT ? 0 : 1;
    passenger_url = `${port}/visual/horizon/?r=${i}`
    setRT(RT => !RT);
  };

  var arr = {
    "a": `${port}/visual/pieChart/`,
    "b": passenger_url,
    "c": `${port}/visual/heatmap/`,
    "d": `${port}/visual/passenger/`,
    "e": `${port}/visual/passenger/`
  }

  const redraw = () => {
    draggedTasks.map(task => {
      var k = task.taskID;
      fetch(arr[k])
        .then(res => res.json())
        .then(
          vegaEmbed("#" + k, arr[k], {
            height: search(layout1, task.taskID, "h"),
            width: search(layout1, task.taskID, "w")
          })
        )
        .catch(err => console.error(err));
    }); 
  };

  useEffect(() => setInterval(redraw, 2000), []);

  const savedatabase = () => {
    var data = {
      user: parseInt(cookies.get("userId")),
      name: dashname + ".json",
      content: JSON.stringify(layout1)
    };
    fetch(`${port}` + `/upload/save`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      credentials: "same-origin"
    })
      .then(response => response.json())
      .then(data => {
        setLogindone(true);
      })
      .catch(e => {
        setLogindone(false);
      });
  };

  function MainListItems() {
    return (
      <div draggable={false}>
        {todos.map(todo => (
          <ListItem
            button
            key={todo.taskID}
            draggable={true}
            onDrag={event => onDrag(event, todo)}
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary={todo.task} />
          </ListItem>
        ))}
      </div>
    );
  }

  function SecondaryListItems() {
    return (
      <div>
        <ListSubheader inset>Recent Activities</ListSubheader>
        {closedTasks.map(todo => (
          <ListItem
            button
            key={todo.taskID}
            draggable={true}
            onDrag={event => onDragAgain(event, todo)}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={todo.task} />
          </ListItem>
        ))}
      </div>
    );
  }

  const [openD, setOpenD] = React.useState(false);

  const handleClickOpen = (event, task) => {
    setOpenD(true);
    var k = task.taskID;
    fetch(arr[k])
      .then(res => res.json())
      .then(vegaEmbed("#vis", arr[k], { height: 500, width: 700 }))
      .catch(err => console.error(err));
  };
  const handleClose = () => {
    setOpenD(false);
  };

  const [logindone, setLogindone] = useState(false);

  const [b, setB] = useState(true);
  setTimeout(() => {  const handleDashname = event => {
    setDashname(event.target.value);
  };
    setB(false);
  }, 2000);

  function DashMenu() {
    return (
      <div style={{ width: 300 }}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          value={dashname}
          options={options.map(option => option.name)}
          renderInput={params => (
            <TextField
              {...params}
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          )}
        />
      </div>
    );
  }

  const [selectedDateTo, setSelectedDateTo] = React.useState(
    new Date("2020-02-05T21:11:54")
  );

  const handleDateChangeTo = date => {
    setSelectedDateTo(date);
  };

  const [selectedDateFrom, setSelectedDateFrom] = React.useState(
    new Date("2020-02-03T21:11:54")
  );

  const handleDateChangeFrom = date => {
    setSelectedDateFrom(date);
  };

  const [city, setCity] = React.useState("Delhi");

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChangeCity = event => {
    setCity(event.target.value);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            AIDAN Dashboard
          </Typography>

          <Typography
            style={{
              opacity: "0.5",
              fontSize: "12px",
              marginTop: "25px",
              display: b ? "block" : "none"
            }}
            className={classes.title}
          >
            {logindone
              ? "All Changes Saved !"
              : " Not Authorized to make changes, Login"}
          </Typography>
          <Button color="inherit" href={`${port}` + "/admin"}>
            Admin
          </Button>
          <Button color="inherit" href="/signin">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <DashMenu />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems />
        </List>
        <Divider />
        <List>
          <SecondaryListItems />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container
          maxWidth="lg"
          className={classes.container}
          onDrop={event => onDrop(event)}
          onDragOver={event => onDragOver(event)}
        >
          <GridLayout
            className="layout"
            layout={layouts}
            onLayoutChange={onLayoutChange}
            cols={12}
            rowHeight={435}
            width={6100}
          >
            {draggedTasks.map(task => (
              <Paper key={task.taskID} style={{ display: "table" }}>
                <div id={task.taskID} style={{ display: "table-row" }}>
                  {task.task}
                  {task.taskID}
                </div>
                <IconButton
                  aria-label=""
                  className={classes.closeButton}
                  style={{ marginRight: "30px" }}
                  onClick={event => handleClickOpen(event, task)}
                >
                  <FullscreenIcon />
                </IconButton>
                <IconButton
                  aria-label="close"
                  className={classes.closeButton}
                  onClick={event => onClose(event, task)}
                >
                  <CloseIcon />
                </IconButton>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      {city}
                      {"  "}
                      {selectedDateTo.getDate() +
                        "/" +
                        (selectedDateTo.getMonth() + 1) +
                        "/" +
                        selectedDateTo.getFullYear()}
                      {" - "}
                      {selectedDateFrom.getDate() +
                        "/" +
                        (selectedDateFrom.getMonth() + 1) +
                        "/" +
                        selectedDateFrom.getFullYear()}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="space-around">
                        <FormControlLabel
                          control={
                            <Switch
                              onChange={e => {
                                handleChangeRT();
                              }}
                              color="primary"
                            />
                          }
                          label="Real-Time"
                        />
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                          style={{ marginTop: "20px" }}
                        >
                          <InputLabel
                            ref={inputLabel}
                            id="demo-simple-select-outlined-label"
                          >
                            City
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={city}
                            onChange={handleChangeCity}
                            labelWidth={labelWidth}
                          >
                            <MenuItem value="Delhi">Delhi</MenuItem>
                            <MenuItem value="Indore">Indore</MenuItem>
                            <MenuItem value="Mumbai">Mumbai</MenuItem>
                          </Select>
                        </FormControl>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Select Date From"
                          value={selectedDateTo}
                          onChange={handleDateChangeTo}
                          KeyboardButtonProps={{
                            "aria-label": "change date"
                          }}
                        />
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Select Date To"
                          value={selectedDateFrom}
                          onChange={handleDateChangeFrom}
                          KeyboardButtonProps={{
                            "aria-label": "change date"
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Paper>
            ))}
          </GridLayout>
        </Container>
      </main>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openD}
        maxWidth="true"
      >
        <Paper>
          <center>
            <div id="vis"></div>
          </center>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <FullscreenExitIcon />
          </IconButton>
        </Paper>
      </Dialog>
      <div id="a" style={{ display: "none" }}></div>
      <div id="b" style={{ display: "none" }}></div>
      <div id="c" style={{ display: "none" }}></div>
      <div id="d" style={{ display: "none" }}></div>
      <div id="e" style={{ display: "none" }}></div>
    </div>
  );
}
