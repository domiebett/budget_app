# Budget App

This is an application designed to keep records of an individuals spending and in all aspects of life. It contains microservices that help it achieve this.

## Running the application

### Prerequisites

You need to have these applications installed:
- `docker`. You can find out how to do this by going to the [docker](https://www.docker.com/) website.
- `git`. Learn how to do this [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Steps
Clone this repository alongside with its submodules:
> $ git clone --recursive https://github.com/domiebett/budget_app

In case you ran git clone without the recursive mode or submodule folders are empty:
> $ git submodule update --init --recursive

Once done, run the application:
> $ docker compose up

You can access the application endpoints by connecting to the gateway on `http://localhost:3000`
