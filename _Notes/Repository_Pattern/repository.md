<H1>Repository Design Pattern</H1>
<p1>The repository Design pattern aims to:</p1>
        
        - Increase Extensibility
        - Make Operations more generic
        - Increase cohesion in areas of the code, especially relating to specific classes an interfaces
        - makes code reuse easier
        - makes testing easier via dependancy injections
        
<H2>How it Works</H2>

    1 Make a repository Interface
```IProductRepository```
    
    2 Derive a Concrete Class from the interface to be injected into Data access object
```ProductRepository```

    3 Define any Data Accessor methods/Classes/Libraries in the derived Concrete class
    
    4 Inject the Concrete Class into another concrete class or module that carries the interface type as a data member
    
    5 Perform data access and updates via the interface member instead of directly
    
    
    