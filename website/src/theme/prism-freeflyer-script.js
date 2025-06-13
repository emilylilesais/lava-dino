// TODO: Finish this. Needs to be more comprehensive and is missing features.
Prism.languages["freeflyer-script"] = Prism.languages.extend("javascript", {
  // Comments
  comment: [
    {
      pattern: /\/\/.*$/m,
      greedy: true,
    },
    {
      pattern: /\/\*[\s\S]*?\*\//,
      greedy: true,
    },
  ],

  // Strings
  string: {
    pattern: /"(?:\\.|[^\\"])*"/,
    greedy: true,
  },

  // Keywords
  keyword: [
    // Control keywords
    {
      pattern:
        /\b(?:Else|ElseIf|EndProcedure|EndMacro|End|For|If|Switch|Target|Try|While|WhileManeuvering|WhileStepping)\b/,
      alias: "control",
    },
    // Command keywords
    {
      pattern:
        /\b(?:Achieve|Alias|ApiLabel|Attach|Break|Call|Case|Close|Continue|Default|Define|ExitProcedure|Get|Include|Iterate|Macro|Maneuver|Map|Monitor|Open|Pause|Plot|PolarMonitor|Procedure|Put|Report|ResetTargettingLoop|Restore|Save|Show|Step|Stop|Struct|Target|Update|Vary|View|Watch)\b/,
      alias: "command",
    },
    // Other keywords
    {
      pattern:
        /\b(?:All|and|append|as|AsType|attaching|Binary|BindCol|BindParam|CCSDSOEM|comment|Constant|CS|element|ephem|ErrorCount|extends|FFephem|from|generating|Global|IsType|named|Next|NORAD|Onetime|or|PCephem|PODS|reset|ResultsPending|ReturnCount|RowCount|sending|SPKephem|station|step|StepSize|STKAHF|STKephem|then|TIMESPAN|to|TS|TypeOf|using|wait|with|within|without)\b/,
      alias: "other",
    },
  ],

  // Constants
  constant: {
    pattern: /\b(?:seconds|minutes|hours|days|weeks|List|TIMESPAN)\b/,
    alias: "language",
  },

  // Objects (built-in types) - split into multiple patterns for readability
  object: [
    // Core objects
    {
      pattern:
        /\b(?:ColorTools|Console|DebuggerLog|FF_Preferences|FF_SolarSystem|OutputLayout|Stars|TimeTools)\b/,
      alias: "type-global",
    },
    // Spacecraft and celestial objects
    {
      pattern:
        /\b(?:Spacecraft|CelestialObject|CelestialSystem|SolarSystem|Star|StarField|Formation|Vehicle|GroundStation|GroundVehicle)\b/,
      alias: "type-spacecraft",
    },
    // Math and physics
    {
      pattern:
        /\b(?:Vector|Matrix|CoordinateSystem|ForceModel|Integrator|Propagator|TwoBody|Burn|FiniteBurn|ImpulsiveBurn)\b/,
      alias: "type-math",
    },
    // Observation and measurement types
    {
      pattern:
        /\b(?:Observation|MeasurementBRTSTwoWayDoppler|MeasurementBRTSTwoWayRange|MeasurementGroundAzimuth|MeasurementGroundDeclination|MeasurementGroundElevation|MeasurementGroundRange|MeasurementGroundRangeRate|MeasurementGroundRightAscension|MeasurementPointSolutionVX|MeasurementPointSolutionVY|MeasurementPointSolutionVZ|MeasurementPointSolutionX|MeasurementPointSolutionY|MeasurementPointSolutionZ|MeasurementPseudorangeC1|MeasurementPseudorangeC2|MeasurementPseudorangeP1|MeasurementPseudorangeP2|MeasurementSpacecraftAzimuth|MeasurementSpacecraftDeclination|MeasurementSpacecraftElevation|MeasurementSpacecraftRange|MeasurementSpacecraftRangeRate|MeasurementSpacecraftRightAscension|MeasurementTDRSOneWayDoppler|MeasurementTDRSTwoWayDoppler|MeasurementTDRSTwoWayRange|Measurement)\b/,
      alias: "type-measurement",
    },
    // Orbit determination types
    {
      pattern:
        /\b(?:BatchLeastSquaresOD|DifferentialCorrector|EstimableAcceleration|EstimableAngleBias|EstimableBStar|EstimableCoefficient|EstimableDistanceBias|EstimableDopplerBias|EstimableEquinoctialA|EstimableEquinoctialLongitude|EstimableHeightBias|EstimableLatLongBias|EstimableMeanMotion|EstimablePosition|EstimablePositionBias|EstimablePositionComponent|EstimableProperty|EstimablePseudoRangeClockDrift|EstimablePseudoRangeReceiverBias|EstimablePseudoRangeTimeBias|EstimableRangeRateBias|EstimableTimeBias|EstimableVelocity|EstimableVelocityBias|EstimatorCovariance|KalmanFilterOD|KalmanSmoother|NoradStateEstimator|ODEstimationProcess|ODProperties|ODThrustEventModelingData|SequentialFilter|Smoother|SquareRootInformationFilterOD|SquareRootInformationSmoother|UnscentedKalmanFilterOD)\b/,
      alias: "type-od",
    },
    // File and data types
    {
      pattern:
        /\b(?:BlackJackPointSolutionFile|BRTSUTDFFile|CCSDSOEMProperties|DSN60ByteObservationFile|FFEphemProperties|FFGroundObservationFile|FileInterface|FileProperties|GPSPivotPointSolutionFile|GroundObservationFile|JsonInterface|PointSolutionFile|RinexNavFile|RinexObsFile|SP3EphemerisFile|SpacecraftObservationFile|SpiceFileReader|SPKProperties|TDRSUTDFFile|TrackingDataFile|Trk234File|UTDFFile)\b/,
      alias: "type-file",
    },
    // UI and visualization types
    {
      pattern:
        /\b(?:BlockageDiagram|BlockageViewpointOptions|CelestialSphereViewpointOptions|ConsoleWindow|DataTableWindow|DebuggerLogWindow|GlobeAtmosphereLayer|GlobeBoundaryLayer|GlobeLineLayer|GlobeLocationLayer|GlobeOptions|GlobeSurfaceLayer|GraphicsOverlay|GraphicsOverlayShape|GridCell|GridCellGroup|GridFont|GridWindow|MapViewpointOptions|OutputLayoutManager|OutputWindow|PlotAxis|PlotBaseObject|PlotFont|PlotLegend|PlotPolynomialSeries|PlotScatterSeries|PlotSeries|PlotTemplate|PlotTitle|PlotWindow|RotatingPulsatingViewpointOptions|SensorViewpointOptions|StarMapViewpointOptions|ThreeDViewpointOptions|UserInterface|ViewFont|Viewpoint|ViewWindow|ViewWindowConfiguration|ViewWindowOutputProperties|WatchWindow|WindowOverlay|WindowOverlayEllipseOptions|WindowOverlayImageOptions|WindowOverlayLinesOptions|WindowOverlayPointsOptions|WindowOverlayRectangleOptions|WindowOverlayShape|WindowOverlayTextOptions|WindowOverlayTrianglesOptions)\b/,
      alias: "type-ui",
    },
    // Hardware and physical components
    {
      pattern:
        /\b(?:BRTSLink|ChemicalTank|ElectricalTank|GPSReceiver|GroundAntenna|GroundAntennaODProperties|Hardware|InterpolatedTank|Receiver|ReceiverODProperties|RFLink|RFLinkComponent|Sensor|SensorODProperties|SphericalTank|Tank|TDRSTransponder|Terrain|ThreeDModel|Thruster|Transponder|TransponderODProperties|Valve)\b/,
      alias: "type-hardware",
    },
    // Remaining types
    {
      pattern:
        /\b(?:AccelerationTerm|AcqData|Array|BroadcastEphemeris|BRTSObservation|BRTSObservationMeasurements|BulStoer|BulStoerVOP|CartesianOrbitStateEstimablePropertyContainer|CartesianStateObservation|CCSDSOEMValidationOptions|ColorUtilities|CovarianceUtilities|Cowell|CustomForce|DataBase|DSNObservation|Email|Ephemeris|EphemerisVector|EquinoctialOrbitStateEstimablePropertyContainer|EquinoctialStateObservation|FlagData|FrequencyRampSchedule|GarbageCollector|GroundHeading|GroundObservationMeasurements|GroundStationObservation|GroundStationODProperties|GroundWaypoints|IAUIAGAttitudeAdvancer|FiniteBurnODProperties|ImpulsiveBurnODProperties|IonosphereOptions|J2Mean|LinearTangentSteering|ListObject|LookAngleFrame|MatlabInterface|Norad|NoradOrbitStateEstimablePropertyContainer|NoradSGP4|NoradSGP4State|NoradSP|Object|OrbitStateObservation|OrbitStateObservationGenerator|OutgassingEvent|OutgassingEventODProperties|PointGroup|PointGroupPoint|PointSolutionObservation|PointSolutionObservationMeasurements|Preferences|ProximityZone|PseudorangeObservation|PseudorangeObservationMeasurements|RampTableEntry|RandomNumberGenerator|ReferenceFrameIDs|Region|ReportInterface|RK45|RK78|RK78VOP|RK89|RotatingLibrationPoint|RotatingPulsatingSystem|Socket|SpacecraftCovariance|SpacecraftObservation|SpacecraftObservationMeasurements|SpacecraftODProperties|SpiceEphemeris|String|StringArray|StringTokenizer|Structure|TDRSObservation|TDRSObservationMeasurements|TDRSRelayObserverLink|ThrustEvent|TimeSpan|TimeSpanArray|TimeUtilities|TLECatalog|TrackingDataEditor|TwoLineElement|Variable|VirtualArray|VirtualMatrix|VirtualMatrixColumnWise|VirtualMatrixRowWise|VirtualObjectArray|VirtualString|VirtualStringArray|VirtualTimeSpan|VirtualTimeSpanArray|VirtualVariable|VisibilityCalculator|VisibilitySegment)\b/,
      alias: "type-other",
    },
  ],

  // Functions
  function: {
    pattern:
      /\b(?:abs|acos|acosh|asin|asinh|atan|atan2|atanh|AttitudeConvert|Average|ceiling|CheckEphemerisFormat|cos|cosh|deg|ElementConvert|exp|factorial|floor|fmod|frexp|GaussianNoise|GetNumberOfNoradStates|GetNumberOfPRNs|ldexp|ln|log|max|min|modf|NumberOfNoradJobSpecsInFile|NutationPrecessionMatrix|PositionConvert|PositionVelocityConvert|pow|rad|ReportStatusMessage|reset|RGB|round|SeedNoise|sign|sin|sinh|sqrt|StringCompare|StringConcat|StringLength|StringToFloat|SubString|SystemTime|tan|tanh|trunc|UniformNoise|VelocityConvert|CrossProduct|DotProduct|EigenVector|Mult3x3Matrix|MultMatrixVector|NutationPrecession|Transpose3x3Matrix|UnitizeVector|VectorMagnitude)\b/,
  },

  // Operators
  operator:
    /=|\?\?|\|\||&&|\||\^|&|==|!=|<=|>=|<<|\+|-|\*|\/|%|!|~|\+\+|--|(\+=)|(-=)|(\*=)|(\/=)|(%=)|(&=)|(\|=)|(\^=)|(<<=)|(>>=)|(>>)|(=>)|(\+\/-)/,

  // Numbers
  // number: /\b\d+(?:\.\d+)?\b/,

  // Punctuation
  punctuation: /[{}[\]();,.]/,
});
