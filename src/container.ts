/**
 * This is a lightweight annotation-based dependency injection container for typescript.
 *
 * Visit the project page on [GitHub] (https://github.com/thiagobustamante/typescript-ioc).
 */
import 'reflect-metadata';
import { Binding } from './binding';
import { ContainerImpl } from './container-impl';

/**
 * The IoC Container class. Can be used to register and to retrieve your dependencies.
 * You can also use de decorators [[Scoped]], [[Singleton]], [[Provided]] and [[Provides]]
 * to configure the dependency directly on the class.
 */
export class Container {
  private container = new ContainerImpl();

  /**
   * Add a dependency to the Container. If this type is already present, just return its associated
   * configuration object.
   * Example of usage:
   *
   * ```
   * Container.bind(PersonDAO).to(ProgrammerDAO).scope(Scope.Singleton);
   * ```
   * @param source The type that will be bound to the Container
   * @return a container configuration
   */
  bind(source: Function): Binding {
    if (!this.container.isBound(source)) {
      return this.container.bind(source).to(source as FunctionConstructor);
    }

    return this.container.bind(source);
  }

  /**
   * Retrieve an object from the container. It will resolve all dependencies and apply any type replacement
   * before return the object.
   * If there is no declared dependency to the given source type, an implicity bind is performed to this type.
   * @param source The dependency type to resolve
   * @return an object resolved for the given source type;
   */
  get<T extends Function>(source: T): T[keyof T] {
    return this.container.getInstance(source);
  }

  /**
   * Retrieve a type associated with the type provided from the container
   * @param source The dependency type to resolve
   * @return an object resolved for the given source type;
   */
  getType(source: Function): Function {
    return this.container.getType(source);
  }
}
