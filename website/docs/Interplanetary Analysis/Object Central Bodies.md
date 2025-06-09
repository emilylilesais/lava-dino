The Central Body is the [CelestialObject](https://ai-solutions.com/_help_Files/celestial_objects.htm) (planet, moon, etc) that the [Spacecraft](https://ai-solutions.com/_help_Files/the_spacecraft_object.htm) orbits, or that a [GroundVehicle](https://ai-solutions.com/_help_Files/groundvehicles.htm), [GroundStation](https://ai-solutions.com/_help_Files/groundstations.htm), [PointGroup](https://ai-solutions.com/_help_Files/pointgroups.htm), or [Region](https://ai-solutions.com/_help_Files/regions.htm) is fixed to. For information on modeling the forces applied by each of these bodies, see the [Extraterrestrial Force Modeling](https://ai-solutions.com/_help_Files/extraterrestrial_force_modelin.htm) page. To create a 2D or 3D Mission View centered on a central body other than the Earth, create a [ViewWindow](https://ai-solutions.com/_help_Files/viewwindows.htm) and edit the Viewpoint Source and Target properties.

:::example

The following [Sample Mission Plans](https://ai-solutions.com/_help_Files/sample_mission_plans.htm) (included with your FreeFlyer installation) demonstrate the use of custom and built-in Celestial Objects:

**Demos**
- [Earth to Moon](https://ai-solutions.com/_help_Files/demos_smp.htm#achr_earthtomoon)

**Interplanetary Samples**
- [Celestial Object](https://ai-solutions.com/_help_Files/interplanetary_smp.htm#achr_celestial)
- [Lunar Ground Station](https://ai-solutions.com/_help_Files/interplanetary_smp.htm#achr_lunargs)

**Spacecraft Propagation Samples**
- [Propagate Spacecraft from SPICE Ephemeris](https://ai-solutions.com/_help_Files/propagation_smp.htm#achr_spicesc)
:::

## Available Bodies
---
The following central bodies are available in FreeFlyer:
- Earth
- Moon
- Sun
- Mercury
- Venus
- Mars
- Jupiter
- Saturn
- Uranus
- Neptune
- Pluto
- [Custom Celestial Objects](https://ai-solutions.com/_help_Files/celestial_objects.htm)

To edit a Spacecraft's, GroundVehicle's, GroundStation's, or Region's central body in a FreeForm script editor, you can use the SetCentralBody() method:

```
Spacecraft1.SetCentralBody(Moon);

GroundVehicle1.SetCentralBody(Moon);

GroundStation1.SetCentralBody(Mars);

Region1.SetCentralBody(Mars);
```

To edit a PointGroup's central body in a FreeForm script editor, you can modify the CentralBody property:

```
PointGroup1.CentralBody = Moon.DeclaredName;
```
