--- 
keywords:
- jedi
---

The FreeFlyer Terrain Index Generator is a command-line utility that allows a user to pre-process [Terrain Data Files](docs/Terrain%20Modeling/Terrain%20Data%20Files.md) and create a terrain index file to be used by the [Terrain Modeling](docs/Terrain%20Modeling/Terrain%20Modeling.md) object. This utility is run independently from FreeFlyer and does not require a FreeFlyer license to execute.

![Terrain Index Generator Utility] (assets/terrain_index_generator.png)
> Terrain Index Generator Utility

## Overview 
---
The Terrain Index Generator executable is provided alongside the FreeFlyer executable in the FreeFlyer install directory at the following location adjusted for the version of FreeFlyer you're using. The utility is capable of running on both Windows and Linux systems.

```
C:\Program Files\a.i. solutions, Inc\FreeFlyer 7.X.X.XXXXX (64-Bit)\freeflyer_terrain_index_generator.exe
```

The Terrain Index Generator creates binary terrain index files encoded with the raster file data to allow FreeFlyer to evaluate [line-of-sight](https://ai-solutions.com/_help_Files/lineofsightcalculators.htm) intersections more efficiently. The Terrain Index Generator requires a user to specify the vertical datum and height units used by the raster data to convert the data into the appropriate format. After creating the index file, the utility will place the file in the same folder as the specified terrain data file. The filename for the generated index file will match the input terrain data file's name but use the .ffidx file extension.

### Vertical Datums
Vertical datums are coordinate systems and reference points that are used to define a location in geographic information system (GIS) applications. The majority of terrain data uses a vertical datum based on a surface of constant geopotential, or geoid. The most commonly used vertical datum is the Earth gravitational Model 96 (EGM96) geoid which references height as meters above mean sea level. The current vertical datum and height unit values that are allowed by the Terrain Index Generator are shown below.

|                        |                                         |
| ---------------------- | --------------------------------------- |
| Vertical Datum values: | Height Unit values:                     |
| •EGM96<br/><br/>•WGS84   | •Meters<br/><br/>•Feet<br/><br/>•Kilometers |

Note: Users are responsible for identifying the vertical datum and height units used for the terrain data. If a user incorrectly specifies the vertical datum or height units, FreeFlyer will interpret the data incorrectly. This information is typically provided within the raster file documentation wherever you acquired it.

### Index Resolution
The index resolution determines the amount of information that the terrain index file contains for performing terrain intersection queries. Users have the ability to define the index resolution used to generate terrain index file via an optional argument in the command-line utility. If the resolution value is not provided, the default value used is 8. By increasing the value of the index resolution, the terrain index file that is generated will result in a larger file size that contains more information to help in accelerating the time to process terrain intersection queries. By decreasing the value of the index resolution, the terrain index file that is generated will result in a smaller file size, but will take longer to perform terrain intersection queries. Generally speaking, this is a tradeoff of file size of the terrain index file against performance gain for the visibility calculations in FreeFlyer using the [Terrain Modeling](docs/Terrain%20Modeling/Terrain%20Modeling.md) object. The default value is chosen as a good balancing point that will not take too much hard drive space and yet optimizes calculations significantly.

## Command Line Execution Instructions
---
To create a terrain index file you will need to open a command prompt or terminal window, depending on your OS, and navigate to the FreeFlyer [install directory](https://ai-solutions.com/_help_Files/installing_freeflyer.htm). Once in the install directory, call the Terrain Index Generator utility with the raster file terrain, vertical datum, height units, and data file path as shown below.

```
// Generate a single terrain index file

freeflyer_terrain_index_generator.exe --vertical-datum EGM96 --height-units Meters "C:\Data\GTOPO30\Mount_Everest.tif"

// or

// Generate a single terrain index file using abbreviated commands

freeflyer_terrain_index_generator.exe -d EGM96 -u meters "C:\Data\GTOPO30\Mount_Everest.tif"
```

Users also have the ability to convert multiple terrain data files at the same time by placing a space between file paths like in the following example.

```
// Generate multiple terrain index files

freeflyer_terrain_index_generator.exe --vertical-datum WGS84 --height-units Feet "C:\Data\GTOPO30\GrandCanyon_North.tif" "C:\Data\GTOPO30\GrandCanyon_South.tif"
```

There is also an option to set the resolution of the Terrain Index file using the resolution command (-r or --resolution) before inputting the file path.

```
// Generate a high resolution terrain index file

freeflyer_terrain_index_generator.exe --resolution 11 --vertical-datum EGM96 --height-units Meters "C:\Data\GTOPO30\Hawaii.tif"

// or

// Generate a high resolution terrain index file using abbreviated commands

freeflyer_terrain_index_generator.exe -r 11 -d EGM96 -u Meters "C:\Data\GTOPO30\Hawaii.tif"
```

Note: If a user is converting multiple files using a single command, the Terrain Index Generator will use the same resolution, vertical datum, and height units to create all resulting files. If you wish to convert multiple files using different properties, it will require separate calls to the tool.

### In-Utility Help Documentation
The utility comes packaged with additional information for the arguments used to create index files and this documentation can be accessed with the -h or --help argument as displayed below.

![FreeFlyer Terrain Index Generator Help Menu] (assets/terrain_index_generator_help.png)
> FreeFlyer Terrain Index Generator Help Menu