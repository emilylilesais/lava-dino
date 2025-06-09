There are a number of properties on the Optimizer object and related objects that can be adjusted to customize the optimization process, some of which will be discussed here. For a full list of properties and methods, see the object pages for the [Optimizer](https://ai-solutions.com/_help_Files/optimizer_nanosecond.htm), [OptimizationStateVariable](https://ai-solutions.com/_help_Files/optimizationstatevariable_nanosecond.htm), and [OptimizationConstraint](https://ai-solutions.com/_help_Files/optimizationconstraint_nanosecond.htm) objects.

Tuning Parameters

The following tuning parameters can be tailored to specific optimization processes to improve the Optimizer object's performance.

### Scaling
There are a number of properties related to scaling the optimization problem that can be used to preserve better matrix conditioning and improve chances of convergence for the process. State variables and constraints that have been added to an optimization process have a Scale property that the user can adjust as needed so that the partial derivatives that will populate the scaled [Jacobian](https://ai-solutions.com/_help_Files/specifying_known_derivatives.htm#achr_jacobiangradient) will be on the order of 1.

```
opt.AddStateVariable("var1");
opt.GetStateVariable("var1").Scale = 1;
opt.AddConstraint("con1");
opt.GetConstraint("con1").Scale = 1e3;
```

Note that the Scale set for each constraint or state variable will affect the entire row or column, respectively, of the Jacobian. Each element of the scaled Jacobian matrix is calculated as follows:

(insert latex equation here)

When these elements are on or near the scale of 1, the matrix is considered to be well-conditioned, meaning that its inverse can be computed with good accuracy and the problem is more likely to be able to converge on a solution.

The same concept can be applied to the gradient with the [ObjectiveFunctionScale](https://ai-solutions.com/_help_Files/optimizer_objectivefunctionscale_nanosecond.htm) property on the Optimizer object:

```
opt.ObjectiveFunctionScale = 10;
```

These scales are reflected in the read-only [ScaledGradient](https://ai-solutions.com/_help_Files/optimizer_scaledgradient_nanosecond.htm) and [ScaledJacobian](https://ai-solutions.com/_help_Files/optimizer_scaledjacobian_nanosecond.htm) properties on the Optimizer, which can be reported during the optimization process.

### FeasibilityTolerance
This property is used to set the tolerance for determining a feasible solution, and is applied slightly differently depending on which third-party optimization engine is loaded (see the [FeasibilityTolerance](https://ai-solutions.com/_help_Files/optimizer_feasibilitytolerance_nanosecond.htm) property page for more information). Note that this tolerance is applied to the scaled bounds.

```
opt.FeasibilityTolerance = 1e-5;
```

### MaximumNominalEvaluationCount

This property sets the maximum number of nominal evaluations that will be performed before the optimization process is terminated.

```
opt.MaximumNominalEvaluationCount = 5000;
```
