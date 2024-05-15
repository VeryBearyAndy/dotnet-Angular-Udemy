<h1>Specification pattern used in tandem with Generic Repositories</h1>
<p1> Generic Repositories do not allow us to specify the queiries we would like to implement, which means in specific cases where<br>the use of special parameters or queries that need to be utilized is not possible.</p1>

    - We can generalize against and include a llambda boolean expression to determine needs, but this produces leaky abstractions
    - We can specify specific behviors in specific derived classes, but this defeats the purpose of generalization
    
<h2>One solution is to use the Specification Pattern </h2>
<p1>The specification pattern allows for specific needs to implemented via Dependancy injection into the getter method, allowing for <br> Generic ropositories while also allowing for specific implementation on objects that require it.