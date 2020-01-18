import React, { useState, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import {MainListItems, SecondaryListItems} from './listItems';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
// import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import { Responsive, WidthProvider } from 'react-grid-layout';
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import CloseIcon from '@material-ui/icons/Close';
import vegaEmbed from 'vega-embed';
import Axios from 'axios';

const makeid = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

var uid = makeid(6);
console.log(uid)

var layout1 = {};
var dashname1 = '';

var port = "http://192.168.43.8:8080";

const ResponsiveGridLayout = WidthProvider(Responsive);
var datajson = {
  todos: [
    {
      taskID: 'a',
      task: 'Sample Endpoint 1'
    },
    {
      taskID: 'b',
      task: 'Sample Endpoint 2'
    },
    {
      taskID: 'c',
      task: 'Sample Endpoint 3'
    }
  ],
  closedTasks: [{
    taskID: 'd',
    task: 'Sample Endpoint 4'
  }],
  draggedTasks: [{
    taskID: 'e',
    task: "Sample Endpoint 5"
  }]
}

// const { todos, closedTasks, draggedTask} = datajson;


function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [dashname, setDashname] = useState(uid);


  const [layouts, setLayouts] = useState([
    // {i: 'a', x: 0, y: 0, w: 6, h: 2, static: true},
    // {i: 'b', x: 10, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    // {i: 'c', x: 4, y: 0, w: 6, h: 2}
  ]);





  const onLayoutChange = layout => {
    setLayouts(layout);
    layout1 = layout;
    savedatabase();
  }

  const [todos, setTodos] = useState(datajson.todos);
  const [closedTasks, setClosedTasks] = useState(datajson.closedTasks);
  const [draggedTasks, setDraggedTasks] = useState(datajson.draggedTasks);


  const onDrag = (event, todo) => {
    setDraggedTasks([
      ...draggedTasks,
      todo
    ]);
  }

  const onClose = (event, todo) => {
    setClosedTasks([
      ...closedTasks,
      todo
    ]);
    var index = draggedTasks.findIndex(i => i.taskID == todo.taskID);
    draggedTasks.splice(index, 1);
  }

  const onDragOver = () => {

  }
  const onDrop = (event) => {
    // const { completedTasks, draggedTask, todos } = this.state;
    // this.setState({
    //   completedTasks: [...completedTasks, draggedTask],
    //   todos: todos.filter(task => task.taskID !== draggedTask.taskID),
    //   draggedTask: {},
    // });

  }

  const arr = {
    "a": `${port}` + `/visual/passenger/`,
    "b": `${port}` + `/visual/passenger/`,
    "c": `${port}` + `/visual/passenger/`,
    "d": `${port}` + `/visual/passenger/`,
    "e": `${port}` + `/visual/passenger/`
  }

  var height, useHeight = useState(0)

  function search(arr, id, p) {
    for (var j = 0; j < arr.length; j = j + 1) {
      if (arr[j].i === id) {
        if (p == 'h') {
          return arr[j].h * 150;
        }
        return arr[j].w * 150;
      }
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      draggedTasks.map(task =>
        fetch(arr[task.taskID])
          .then(res => res.json())
          .then(spec => vegaEmbed('#' + task.taskID, spec, { height: search(layout1, task.taskID, "h"), width: search(layout1, task.taskID, "w") }))
          .catch(err => console.error(err))
      );
      // console.log("hello")
    }, 10000);


  }, []);

  const savedatabase = () => {
    var data = {name: dashname1, content: JSON.stringify(layout1)}
    fetch('http://192.168.43.8:8080/upload/', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

  }


  function MainListItems() {
    return (
      <div draggable={false}>
        {/* <ListItem button draggable={true}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem> */}
        {
          todos.map(todo =>
            <ListItem button
              key={todo.taskID}
              draggable={true}
              onDrag={(event) => onDrag(event, todo)}>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary={todo.task} />
            </ListItem>
          )
        }
        {/* <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItem> */}
      </div>);
  };

  function SecondaryListItems() {
    return (<div>
      <ListSubheader inset>Recent Activities</ListSubheader>
      {closedTasks.map(todo =>
        <ListItem button
          key={todo.taskID}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary={todo.task} />
        </ListItem>
      )}

    </div>);
  };



  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            AIDAN Dashboard
          </Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <Button color="inherit" href="/admin">Admin</Button>
          <Button color="inherit" href="/signin">Login</Button>
          
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <Input defaultValue={uid} inputProps={{ 'aria-label': 'description' }} onChange={(e) => { setDashname(e.target.value); dashname1=dashname }} />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><MainListItems /></List>
        <Divider />
        <List><SecondaryListItems /></List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}
          onDrop={event => onDrop(event)}
          onDragOver={(event => onDragOver(event))}
        >
          <ResponsiveGridLayout className="layout" layouts={layouts} onLayoutChange={onLayoutChange}
          // breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          // cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}} 
          >
            {
              draggedTasks.map(task =>
                <Paper key={task.taskID} style={{ display: "table" }}>
                  <div id={task.taskID} style={{ display: "table-row" }}>{task.task}{task.taskID}</div>
                  <IconButton aria-label="close" className={classes.closeButton} onClick={event => onClose(event, task)}>
                    <CloseIcon />
                  </IconButton></Paper>

              )
            }
          </ResponsiveGridLayout>
        </Container>
      </main>
    </div>
  );
}
