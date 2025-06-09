FreeFlyer models solar system bodies (i.e. planets, moons, asteroids, or comets) via the [CelestialObject](https://ai-solutions.com/_help_Files/celestialobject_nanosecond.htm). The eight planets, Earth's Moon, the Sun, and Pluto are built-in CelestialObjects. You can also create custom CelestialObjects to model other moons, asteroids, comets, etc. The gravitational effects of any CelestialObject can be included in any Spacecraft's [Force Model](https://ai-solutions.com/_help_Files/setting_up_a_force_model.htm). You can also use a CelestialObject as the [central body](https://ai-solutions.com/_help_Files/central_body.htm) for a Spacecraft, GroundStation, PointGroup, or Region.

This page covers information on configuring a CelestialObject's basic properties, its orbital motion, and its orientation model. For a summary of the available methods for computing shadows cast by a CelestialObject, and methods for computing when CelestialObjects are visible to other objects, see the [Contact Method Summary](https://ai-solutions.com/_help_Files/contact_method_summary.htm#ache_celestialobject).

To create a view centered on a CelestialObject, create a [ViewWindow](https://ai-solutions.com/_help_Files/viewwindows.htm) and edit the [3D viewpoint](https://ai-solutions.com/_help_Files/3d_view.htm) Source and Target properties, or the [2D viewpoint](https://ai-solutions.com/_help_Files/2d_map.htm) Mapped Body. For detailed information on configuring the display of a CelestialObject, including day/night textures, coastlines, and political boundaries, see the [Globe Layers](https://ai-solutions.com/_help_Files/globe_layers.htm) page in the [Generating Output](https://ai-solutions.com/_help_Files/generating_output.htm) guide.

> [!example]
> The following [Sample Mission Plans](https://ai-solutions.com/_help_Files/sample_mission_plans.htm) (included with your FreeFlyer installation) demonstrate the use of custom and built-in Celestial Objects:
> 
> **Demos**
> - [Earth to Moon](https://ai-solutions.com/_help_Files/demos_smp.htm#achr_earthtomoon)
> 
> **Coverage and Contact Samples**
> - [Region - Apollo Landing Sites](https://ai-solutions.com/_help_Files/coverage_and_contact_smp.htm#achr_regionapollolandingsites)
> 
> **Interplanetary Samples**
> - [Asteroid Contact](https://ai-solutions.com/_help_Files/interplanetary_smp.htm#achr_astrcontact)
> - [B-Plane Targeting](https://ai-solutions.com/_help_Files/interplanetary_smp.htm#achr_bplane)
> - [Celestial Object](https://ai-solutions.com/_help_Files/interplanetary_smp.htm#achr_celestial)
> - [Custom Lunar Coordinate System](https://ai-solutions.com/_help_Files/interplanetary_smp.htm#achr_lunarcs)
> - [Earth Moon Shadow Times](https://ai-solutions.com/_help_Files/interplanetary_smp.htm#achr_earthmoonshadow)
> - [Earth-Mars Hohmann Transfer](https://ai-solutions.com/_help_Files/interplanetary_smp.htm#achr_earthmarshohmanntransfer)
> - [Hyperbola Arrival Maneuver](https://ai-solutions.com/_help_Files/interplanetary_smp.htm#achr_arrivaldv)
> - [Lambert Transfer Calculation](https://ai-solutions.com/_help_Files/interplanetary_smp.htm#achr_lambert)
> - [Lunar Ground Station](https://ai-solutions.com/_help_Files/interplanetary_smp.htm#achr_lunargs)
> - [Mars Flybys](https://ai-solutions.com/_help_Files/interplanetary_smp.htm#achr_marsflybys)
> - [Rings of Jupiter](https://ai-solutions.com/_help_Files/interplanetary_smp.htm#achr_ringsofjupiter)
> 
> **Spacecraft Propagation Samples**
> - [Propagate Spacecraft from SPICE Ephemeris](https://ai-solutions.com/_help_Files/propagation_smp.htm#achr_spicesc)

## Celestial Object Body ID
---
The CelestialObject has a [BodyID](https://ai-solutions.com/_help_Files/celestialobject_bodyid_nanosecond.htm) property which can be used to provide a numerical representation of a celestial body. This numerical representation can be used as input for a variety of FreeFlyer's properties and methods, such as [Spacecraft.Azimuth(BodyID)](https://ai-solutions.com/_help_Files/spacecraft_azimuth_nanosecond.htm) or [GroundStation.TrackingInterference(trackedSpacecraft, interferenceAngle, interferingCelestialObjectID)](https://ai-solutions.com/_help_Files/groundstation_trackinginterference_nanosecond.htm).

The following body ID's are assigned to the default Solar System objects:

| Body ID | Celestial Body |
| ------- | -------------- |
| 1       | Mercury        |
| 2       | Venus          |
| 3       | Earth          |
| 4       | Mars           |
| 5       | Jupiter        |
| 6       | Saturn         |
| 7       | Uranus         |
| 8       | Neptune        |
| 9       | Pluto          |
| 10      | Moon           |
| 11      | Sun            |

Custom CelestialObjects will have body ID's starting at 12 and assigned in the order they are created.

```
// Io is the first custom CelestialObject added to this Mission Plan, so its Body ID is 12

// Use the Io Body ID in an access calculation

Report Spacecraft1.Access(Io.BodyID);
```

> [!NOTE]
> When accessing the array properties of the ForceModel object listed below, the indexing for the default solar system bodies begins at 0. For example, to access the PlanetFieldDegree property for Mercury, you should use ForceModel.PlanetFieldDegree[0] (not 1).
> - ForceModel.PlanetFieldDegree
> - ForceModel.PlanetFieldOrder
> - ForceModel.PlanetFieldType
> - ForceModel.UseBodyForce
> - ForceModel.UseZeroTideModel
> - ForceModel.SolidTideDegree
> - ForceModel.SolidTideFilename
> - ForceModel.SolidTideOrder

## Celestial Object Reference Frame IDs
---
Every CelestialObject holds a set of reference frames that can be used with various methods and functions. Each CelestialObject holds the following frames:

| Reference Frame  Name        | Reference Frame  ID              |
| ---------------------------- | -------------------------------- |
| Body Fixed                   | CelestialObject.BodyId * 100 + 1 |
| Inertial Equatorial J2000    | CelestialObject.BodyId * 100 + 2 |
| Inertial Equatorial At Epoch | CelestialObject.BodyId * 100 + 3 |

Please refer to the [Orbit Reference Frames](https://ai-solutions.com/_help_Files/orbit_reference_frames.htm) page for more information on the definition of these frames. You can access these reference frames through their IDs using syntax such as:

```
Report Earth.ReferenceFrameIDs.BodyFixed; // returns "301"
```

These reference frame IDs can be used to specify reference frames for conversion functions and methods including:
- [PositionConvert()](https://ai-solutions.com/_help_Files/function_positionconvert_nanosecond.htm)
- [VelocityConvert()](https://ai-solutions.com/_help_Files/function_velocityconvert_nanosecond.htm)
- [PositionVelocityConvert()](https://ai-solutions.com/_help_Files/function_positionvelocityconvert_nanosecond.htm)
- [Spacecraft.SetKeplerianState()](https://ai-solutions.com/_help_Files/spacecraft_setkeplerianstate_nanosecond.htm) and [Spacecraft.GetKeplerianState()](https://ai-solutions.com/_help_Files/spacecraft_getkeplerianstate_nanosecond.htm)
- [Spacecraft.SetCartesianState()](https://ai-solutions.com/_help_Files/spacecraft_setcartesianstate_nanosecond.htm) and [Spacecraft.GetCartesianState()](https://ai-solutions.com/_help_Files/spacecraft_getcartesianstate_nanosecond.htm)
- [CelestialObject.SetKeplerianState()](https://ai-solutions.com/_help_Files/celestialobject_setkeplerianstate_nanosecond.htm) and [CelestialObject.GetKeplerianStateAtEpoch()](https://ai-solutions.com/_help_Files/celestialobject_getkeplerianstateatepoch_nanosecond.htm)
- [CelestialObject.SetCartesianState()](https://ai-solutions.com/_help_Files/celestialobject_setcartesianstate_nanosecond.htm) and [CelestialObject.GetCartesianStateAtEpoch()](https://ai-solutions.com/_help_Files/celestialobject_getcartesianstateatepoch_nanosecond.htm)

## Celestial Object Configuration
---
You can create a custom CelestialObject in the Object Browser or through a FreeForm script editor. After creating a CelestialObject using the Object Browser, double-click it to edit. The Properties page prompts you to specify:
1. The CelestialObject's central body (for example, the CentralBody for the moon Io would be Jupiter)
2. The gravitational parameter Mu (in kg3/s2)
3. The CelestialObject's equatorial radius (in km)
4. The CelestialObject's flattening coefficient

![The Properties page of the CelestialObject GUI] (assets/io_properties.png)
> The Properties page of the CelestialObject GUI

To create a CelestialObject and set these basic properties in FreeFlyer script, follow these syntax examples:
```
CelestialObject Io;

// Set basic properties

Io.CentralBody = Jupiter.DeclaredName;

Io.Mu = 5959.916;

Io.RadiusEquatorial = 1821.6;

Io.Flattening = 0.001;
```

You can set a custom CelestialObject as the [Central Body](https://ai-solutions.com/_help_Files/central_body.htm) for a Spacecraft object using this syntax:

```

Spacecraft1.SetCentralBody(Io);
```

## Orbital Motion Model
---
User-created CelestialObjects can be propagated using a [TwoBody](https://ai-solutions.com/_help_Files/twobody_nanosecond.htm) propagator or a [SpiceEphemeris](https://ai-solutions.com/_help_Files/spiceephemeris_nanosecond.htm) propagator. Built-in CelestialObjects (the eight planets, Earth's Moon, the Sun, and Pluto) can also be propagated using the internal [DE State Advancer](https://ai-solutions.com/_help_Files/planetary_forces_files.htm).

By default, built-in CelestialObjects such as the Earth use the DE State Advancer propagator, and user-created CelestialObjects will use a [TwoBody](https://ai-solutions.com/_help_Files/twobody_nanosecond.htm) propagator. To change the propagator for a CelestialObject, use the [CelestialObject.SetPropagatorType()](https://ai-solutions.com/_help_Files/celestialobject_setpropagatortype_nanosecond.htm) method.

### Setting the Orbital Motion Model for built-in CelestialObjects
The example below demonstrates how to change the propagator for a built-in CelestialObject from the default DE State Advancer to a [TwoBody](https://ai-solutions.com/_help_Files/twobody_nanosecond.htm) propagator. Note that we need to specify the initial orbital state to use with the TwoBody propagator:

```
// Populate an Array with the initial state to use

Array state = Earth.GetCartesianStateAtEpoch(Spacecraft1.Epoch);

// Override the default DE State Advancer for the Earth and use a TwoBody propagator instead

Earth.SetPropagatorType(TypeOf(TwoBody));

// Initialize the orbital state that will be used with the TwoBody propagator

Earth.SetCartesianState(Spacecraft1.Epoch, state);
```

To reset a built-in CelestialObject to use the default DE State Advancer again, use the following syntax:

```
Earth.ResetToDefaultPropagator();
```

### Setting the Orbital Motion Model for user-created CelestialObjects
The example below demonstrates how to configure a custom CelestialObject called Io to use a [SpiceEphemeris](https://ai-solutions.com/_help_Files/spiceephemeris_nanosecond.htm) propagator instead of the default TwoBody propagator:

```
Io.SetPropagatorType(TypeOf(SpiceEphemeris));
```

You could also specify the propagator type to use when creating the CelestialObject, in the object's [constructor](https://ai-solutions.com/_help_Files/working_with_objects.htm#object_constructors):

```
SpiceEphemeris IoSpiceEphem;

CelestialObject Io(IoSpiceEphem);
```

When using a SpiceEphemeris as a CelestialObject's propagator, you can specify the SPICE files used via the CelestialObject Editor or through FreeFlyer Script, as shown below. You must set the name or NAIF ID of the target and observer celestial bodies in order to tell FreeFlyer which object to model. The example below models Jupiter's moon Io by loading a SPICE file and setting the Target to "Io" and the Observer to "Jupiter".

```
// To configure the orbital motion model for a CelestialObject:

(Io.Propagator AsType SpiceEphemeris).NumberOfSpiceFiles = 1;

(Io.Propagator AsType SpiceEphemeris).SpiceFiles[0]      = "jup147s.bsp";

(Io.Propagator AsType SpiceEphemeris).Observer           = "Jupiter";

(Io.Propagator AsType SpiceEphemeris).Target             = "Io";
```

SPICE files are ephemerides created and maintained by the Navigation and Ancillary Information Facility (NAIF) Node of the Planetary Data System. For more information on SPICE files, including instructions on how to obtain them, see the [SPICE Files](https://ai-solutions.com/_help_Files/spice_files.htm) page of the [Ephemerides and AHF](https://ai-solutions.com/_help_Files/ephemerides_and_ahf.htm) section of the [Appendix](https://ai-solutions.com/_help_Files/appendix.htm).

SPICE ephemerides can also be used to define the motion of Spacecraft objects. For information about using SPICE ephemerides with Spacecraft objects, see the [Using a SPICE Ephemeris](https://ai-solutions.com/_help_Files/using_a_spice_ephemeris.htm) page of the [Spacecraft Propagation](https://ai-solutions.com/_help_Files/spacecraft_propagation.htm) Guide.

![Celestial Object Basic Properties Editor] (assets/io_motionmodel.png)
> Celestial Object Basic Properties Editor

## Orientation Model
---
FreeFlyer uses the IAU/IAG analytical orientation models for most of the the built-in CelestialObjects (all except the Earth, Moon, and Sun). You can also use the IAU/IAG analytical models for user-created CelestialObjects, or specify your own analytical model.

> [!NOTE]
> The orientation of the Earth is computed using the International Astronomical Union (IAU) 1976/80 nutation and precession model. The orientation of the Moon is computed using the Moon Principal Axis (PA) frame from the [planetary ephemeris](https://ai-solutions.com/_help_Files/planetary_forces_files.htm) (DE file). See the [Solar System](https://ai-solutions.com/_help_Files/solar_system.htm) page for more information.

The **IAU/IAG Analytical Model** can be used to model the orientation of many solar system objects, including but not limited to: Mercury, Venus, Earth, Moon, Mars, Phobos, Deimos, Jupiter, Io, Europa, Ganymede, Callisto, Saturn, Enceladus, Titan, Phoebe, Uranus, Neptune, Triton, Pluto, Charon, Ceres, Vesta, Eros, Itokawa, and more.  
   
This can be assigned through the CelestialObject Editor or through FreeFlyer Script, as shown below.  
 
```
// To configure the orientation model for a CelestialObject:

(Io.AttitudeModel AsType IAUIAGAttitudeAdvancer).Model = 0; // IAU/IAG Analytical model

(Io.AttitudeModel AsType IAUIAGAttitudeAdvancer).ObjectName = "Io";
```

![Orientation Model] (assets/io_orientationmodel.png)

You can also configure a **Custom Analytical Orientation Model**, which allows you to specify alpha nought, delta nought, omega nought, and the omega rate that define the analytical attitude model. These values can be assigned through the CelestialObject Editor or through FreeForm Script as shown below:  
 
```
// To configure the orientation model for a CelestialObject:

(Io.AttitudeModel AsType IAUIAGAttitudeAdvancer).Model = 1; // Custom Analytical model

(Io.AttitudeModel AsType IAUIAGAttitudeAdvancer).AlphaNought = 0.000008762;

(Io.AttitudeModel AsType IAUIAGAttitudeAdvancer).DeltaNought = 90.000007614;

(Io.AttitudeModel AsType IAUIAGAttitudeAdvancer).OmegaNought = 0.0;

(Io.AttitudeModel AsType IAUIAGAttitudeAdvancer).OmegaRate   = 0.0;
```

![Orientation Model1] (assets/io_orientationmodel_custom.png)

You can also select **No Orientation Updates** for the orientation model, which means that the attitude of the Celestial Object will not change with time.

```
(Io.AttitudeModel AsType IAUIAGAttitudeAdvancer).Model = 2; // No orientation updates
```

## Visualization
---
You can set the tail length and surface texture for a CelestialObject through the CelestialObject editor or FreeFlyer script, as shown below. For detailed information on configuring the display of CelestialObject, see the [Globe Layers](https://ai-solutions.com/_help_Files/globe_layers.htm) page.

```
// Visualization settings

Io.TailLength = 100;

Io.Globe.SurfaceLayer.DaytimeImageFilename = "io.jpg";
```

![Celestial Object Visualization Properties Editor] (assets/io_visualization.png)
> Celestial Object Visualization Properties Editor

The image below shows a custom CelestialObject representing Io as it orbits the built-in CelestialObject Jupiter.

![Custom CelestialObject Io orbiting Jupiter] (assets/io.jpg)
> Custom CelestialObject Io orbiting Jupiter