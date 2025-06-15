---
title: Rotating Libration Points
editUrl: false
---

FreeFlyer allows you to work with rotating libration points (L1-L5) in any system. A rotating libration point (RLP) frame can be defined using any two built-in or user-defined [CelestialObjects](https://ai-solutions.com/_help_Files/celestial_objects.htm) or CelestialSystems (representing system barycenters). You can set or get the state of a Spacecraft object with respect to any rotating libration point frame.

:::tip
The following [Sample Mission Plans](https://ai-solutions.com/_help_Files/sample_mission_plans.htm) (included with your FreeFlyer installation) demonstrate the use of the Rotating Libration Point:

Interplanetary Samples

* [Libration Point Orbiter](https://ai-solutions.com/_help_Files/interplanetary_smp.htm#achr_lpo)

:::

## The Rotating Libration Point Frame

***

The rotating libration point (RLP) frame is a commonly used frame for describing dynamical motion in the circular restricted three-body problem (CRTBP or CR3BP) about the Lagrange points, L1-L5. The two gravitational centers used to define an RLP frame in FreeFlyer can be any two [CelestialObjects](https://ai-solutions.com/_help_Files/celestial_objects.htm) or CelestialSystem objects (representing the barycenter of one or more CelestialObjects).

The L1, L2, and L3 points are collinear, lying along the line joining the primary system (P1) and the secondary system (P2). The L4 and L5 points each form equilateral triangles with the positions of P1 and P2, in the plane of P2's orbit around P1, as shown in the diagram below:

!\[Lagrange Points] (assets/lagrangepoints.png)

> Lagrange Points

We can define a coordinate system at each Lagrange point, L1-L5. For L1-L3, the coordinate system X-axis lies along the line defined by the two gravitational centers, P1 and P2. For L4 and L5, the X-axis lies parallel to the line segment P1-P2, pointing in the direction of P2. The Z-axis for all five Lagrange point coordinate systems is normal to the plane of P2's orbit around P1. The Y-axis completes the right-handed triad for each system. By definition, the frame is non-inertial, and rotates at the same rate as P2 and P1 move about their common barycenter. An example of the L3-centered RLP coordinate system is shown below.

!\[L3-Centered RLP Coordinate System] (assets/l3\_centered.png)

> L3-Centered RLP Coordinate System

## Defining a Rotating Libration Point

***

A [RotatingLibrationPoint](https://ai-solutions.com/_help_Files/rotatinglibrationpoint_nanosecond.htm) object can be created in the FreeFlyer object browser or in FreeFlyer script; however, it must be configured in FreeFlyer script.

You can define a RotatingLibrationPoint object using any of the built-in CelestialObjects, such as the Earth, Moon, Sun, and Mars, or you can define your own CelestialObjects or CelestialSystems. See the [CelestialObjects](https://ai-solutions.com/_help_Files/celestial_objects.htm) page for complete information on how to define a custom CelestialObject.

### Setting up a RotatingLibrationPoint

The example below shows the syntax to configure a RotatingLibrationPoint object to model the Sun-Saturn L1 frame using two CelestialObjects:

```
RotatingLibrationPoint SunSaturnL1;

// Use the Sun as the primary body

SunSaturnL1.PrimarySystem.AddBody(Sun);

// Use Saturn as the secondary body

SunSaturnL1.SecondarySystem.AddBody(Saturn);

// Model the L1 point in the Sun-Saturn system

SunSaturnL1.LibrationPoint = "L1";

// The reference body is used as the origin when computing the position and velocity of the RotatingLibrationPoint

SunSaturnL1.SetReferenceBody(Saturn);

// See below for more information on RecomputeBarycenter

SunSaturnL1.RecomputeBarycenter = 1;
```

You can get a spacecraft's or CelestialObject's state with respect to a RotatingLibrationPoint, as well as the state of the RotatingLibrationPoint itself at a given epoch:

```
Spacecraft sc;

// Report the position of the Spacecraft with respect to the RotatingLibrationPoint

Report SunSaturnL1.GetPositionOfObject(sc.Epoch, sc, 1);

// Report the position of the RotatingLibrationPoint with respect to its ReferenceBody

Report SunSaturnL1.GetPositionAtEpoch(sc.Epoch)
```

### Setting up a CelestialSystem

A CelestialSystem lets you model a system barycenter using one or more CelestialObjects. CelestialSystems allow you to add both user-defined and built-in CelestialObjects into one unified system. The example below shows how to define a custom [CelestialSystem](https://ai-solutions.com/_help_Files/celestialsystem_nanosecond.htm):

```
CelestialSystem EarthMoonBarycenter;

// Add CelestialObjects to the CelestialSystem

// The largest body is automatically designated as the primary object in the system.

EarthMoonBarycenter.AddBody(Earth, Moon);

// The reference body is used as the origin when computing the position and velocity of the CelestialSystem's barycenter

EarthMoonBarycenter.SetReferenceBody(Earth);

// See below for more information on RecomputeBarycenter

EarthMoonBarycenter.RecomputeBarycenter = 1
```

You can get a spacecraft's or CelestialObject's state with respect to the barycenter of a CelestialSystem, as well as the state of the barycenter of the CelestialSystem itself at a given epoch.

```
Spacecraft sc;

// Report the position of the Spacecraft with respect to the CelestialSystem barycenter

Report EarthMoonBarycenter.GetPositionOfObject(sc.Epoch, sc);

// Report the position of the barycenter of the CelestialSystem with respect to its ReferenceBody

Report EarthMoonBarycenter.GetPositionAtEpoch(sc.Epoch)
```

A CelestialSystem can be used as the primary or secondary system in a RotatingLibrationPoint object. The example below shows how to configure a RotatingLibrationPoint modeling the Sun-Earth/Moon L2 frame using a CelestialObject (the Sun) and a CelestialSystem (the Earth/Moon system):

```
RotatingLibrationPoint SunEarthMoonL2;

// Use the Sun as the primary body

SunEarthMoonL2.PrimarySystem.AddBody(Sun);

// Use the Earth-Moon system as the secondary body

SunEarthMoonL2.SetSecondarySystem(EarthMoonBarycenter);

// Model the L2 point in the Sun-Earth/Moon system

SunEarthMoonL2.LibrationPoint = "L2";

// See below for more information on RecomputeBarycenter

SunEarthMoonL2.RecomputeBarycenter = 1;
```

### Define the Barycenter

It is important to note that the built-in planets, with the exception of the Earth, represent their system barycenters. For example, the built-in Jupiter object is defined using the Jupiter system barycenter. To model the body center of an individual planet (other than the Earth), you must create and set up a custom [CelestialObject](https://ai-solutions.com/_help_Files/celestial_objects.htm).

The CelestialSystem and RotatingLibrationPoint objects provide two options for how the barycenters of these systems should be defined. These options ensure that users can avoid counting the mass of certain bodies twice. It is important to set this value appropriately based on the CelestialObjects in your CelestialSystem or RotatingLibrationPoint object, to avoid incorrect calculations.

For both Celestial Systems and Rotating Libration Points you can define how the barycenter should be computed using the RecomputeBarycenter property as shown below:

```
CelestialSystem exampleSystem;

exampleSystem.RecomputeBarycenter = 0;

exampleSystem.RecomputeBarycenter = 1;
```

The following table summarizes the implications of these two options:

|                                                                                                      | RecomputeBarycenter = 1                                                                                              | RecomputeBarycenter = 0                                                                            |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [CelestialSystem](https://ai-solutions.com/_help_Files/celestialsystem_nanosecond.htm)               | All the bodies in the system will be used to compute the barycenter of the CelestialSystem. (latex goes here)        | The largest body in the system will be used as the system barycenter. (latex goes here)            |
| [RotatingLibrationPoint](https://ai-solutions.com/_help_Files/rotatinglibrationpoint_nanosecond.htm) | All the bodies in the system will be used to compute the RotatingLibrationPoint system barycenter. (latex goes here) | The primary system will be used as the RotatingLibrationPoint system barycenter. (latex goes here) |
| Where:                                                                                               |                                                                                                                      |                                                                                                    |

* *MR* = the mass ratio of the system
* *primary\_mass* = mass of the largest body in the CelestialSystem
* *secondary\_mass* = mass of all secondary bodies in the CelestialSystem
* *primary\_system* = mass of all bodies in the primary system of the RotatingLibrationPoint
* *secondary\_system* = mass of all bodies in the secondary system of the RotatingLibrationPoint

### Visualization

You can specify the color of the RotatingLibrationPoint object, and the size to draw its axes. To create a 3D Viewpoint centered on a RotatingLibrationPoint, create a [ViewWindow](https://ai-solutions.com/_help_Files/viewwindows.htm) and edit the Viewpoint Source and Target properties as shown below:

```
// Visualization

Spacecraft sc;

SunSaturnL1.VisualScale = 1500;

SunSaturnL1.Color = ColorTools.Lime;

//Create RLP Centered 3D View

ViewWindow rlpView({sc, sunSaturnL1});

rlpView.Viewpoints[0].ThreeDView.Source = SunSaturnL1.ObjectId;

rlpView.Viewpoints[0].ThreeDView.Target = SunSaturnL1.ObjectId;

rlpView.Viewpoints[0].ThreeDView.TailReference = SunSaturnL1.ObjectId;

Step sc;

Update rlpView;
```

## Example: Write States to File

***

In this example, a spacecraft is initialized orbiting the L1 point of the Sun-Earth/Moon rotating libration point system. The spacecraft is propagated for 100 days, and the spacecraft state with respect to L1 is written to a file on each day.

(can't use expand here)

```
// Create the RLP object

RotatingLibrationPoint rlpL1;

rlpL1.PrimarySystem.AddBody(Sun);

rlpL1.SecondarySystem.AddBody(Earth, Moon);

rlpL1.LibrationPoint = "L1";

rlpL1.VisualScale = 200000;

// Create the Spacecraft object

Spacecraft sc;

sc.Propagator.StepSize = TIMESPAN(1 days);

// Assign the Spacecraft state with respect to L1

Array L1state = {120000, 0, 120000, 0, -0.150545619, 0};

rlpL1.SetSpacecraftState(sc, 3 /* Rotating Frame */, 1 /* Lagrange Point */, L1state);

// Open an output file for writing

FileInterface fi;

fi.WriteMode = 1;

fi.Filename = "L1Ephem.txt";

fi.Open();

// Configure a 3D view

ViewWindow vw({sc, rlpL1});

vw.Viewpoints[0].ThreeDView.Source = rlpL1.ObjectId;

vw.Viewpoints[0].ThreeDView.Target = rlpL1.ObjectId;

vw.Viewpoints[0].ThreeDView.Radius = 4000000;

vw.Viewpoints[0].ThreeDView.RightAscension = 206;

vw.Viewpoints[0].ThreeDView.Declination = 20;

vw.SetShowName(sc.ObjectId, 1);

vw.SetHistoryMode(sc.ObjectId, 1);

vw.SetShowAxis(rlpL1.ObjectId, 1);

While (sc.ElapsedTime < TIMESPAN(100 days));

      L1state = rlpL1.GetSpacecraftState(sc, 1, 2);

      fi.PutLine(sc.EpochText   + " " + 

          L1state[0].ToString() + " " + 

          L1state[1].ToString() + " " + 

          L1state[2].ToString() + " " + 

          L1state[3].ToString() + " " + 

          L1state[4].ToString() + " " + 

          L1state[5].ToString());

      vw.Update();

      Step sc;

End;

fi.Close();
```
