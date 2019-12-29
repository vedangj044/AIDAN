import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Name from './Name';
// import { VectorMap } from "react-jvectormap";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Orders from './Orders';
import clsx from 'clsx';
import VectorMaps from './VectorMap';

var mapData = {
    AU: 760,
    BR: 550,
    CA: 120,
    DE: 1300,
    FR: 540,
    GB: 690,
    GE: 200,
    IN: 200,
    RO: 600,
    RU: 300,
    US: 2920
  };

// const useStyles = makeStyles(theme => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));
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
}));
// function VectorMaps({map}) {
//   if (map !== " ")
//   {
//     return (
//       <div >
        
//                 <VectorMap
//                   map={map}
//                   backgroundColor="transparent"
//                   zoomOnScroll={false}
//                   containerStyle={{
//                     width: "100%",
//                     height: "420px"
//                   }}
//                   containerClassName="map"
//                   regionStyle={{
//                     initial: {
//                       fill: "#e4e4e4",
//                       "fill-opacity": 0.9,
//                       stroke: "none",
//                       "stroke-width": 0,
//                       "stroke-opacity": 0
//                     }
//                   }}
//                   series={{
//                     regions: [
//                       {
//                         values: mapData,
//                         scale: ["#AAAAAA", "#444444"],
//                         normalizeFunction: "polynomial"
//                       }
//                     ]
//                   }}
//                 />
//              <Name name={map}/>
//       </div>
//     );
//                 }
//                 else return(<div><Name name={map}/></div>);
//   }
  
// function SimpleSelect({map}) {
//   const classes = useStyles();
//   const [map, setMap] = React.useState("world_mill");
//   const handleChange = event => {
//     setMap(event.target.value);
//   };
//   const inputLabel = React.useRef(null);
//   const [labelWidth, setLabelWidth] = React.useState(0);
//   React.useEffect(() => {
//     setLabelWidth(inputLabel.current.offsetWidth);
//   }, []);

 

//   return (
//     <div>
      
//       <FormControl variant="outlined" className={classes.formControl}>
//         <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
//           Map
//         </InputLabel>
//         <Select
//           labelId="demo-simple-select-outlined-label"
//           id="demo-simple-select-outlined"
//           value={map}
//           onChange={handleChange}
//           labelWidth={labelWidth}
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           <MenuItem value={"world_mill"}>World</MenuItem>
//           <MenuItem value={20}>Twenty</MenuItem>
//           <MenuItem value={30}>Thirty</MenuItem>
//         </Select>
//       </FormControl>
//       <Name name={map}/>
//     </div>
//   );
// }


export default function Mapdash() {
  
  const classes = useStyles();
    
    const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  
  const [map, setMap] = React.useState(" ");
  const handleChange = event => {
    setMap(event.target.value);
  };
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

    return (
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={classes.paper}>
                <VectorMaps map={map}/>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
              <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Map
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={map}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"world_mill"}>World</MenuItem>
          <MenuItem value={"us_aea"}>US</MenuItem>
          <MenuItem value={"asia_mill"}>Asia</MenuItem>
          {/* <MenuItem value={"in_mill"}>MP</MenuItem> */}
        </Select>
      </FormControl>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
          
        </Container>
      </main>
    );
}
