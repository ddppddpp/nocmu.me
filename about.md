## About
[nocmu.me](https://nocmu.me) is a Fasting Diet calendar site based on the traditional fasting rules of the Bulgarian Christian Orthodox church, as outlined in the Typikon last published in 1980.

The name is a latin look-alike of the cylliric letters постите, which stands for 'the fasting days' in Bulgarian.

The types of allowed or forbidden food for a particular date follow a complex rule set, some constant year after year, while others depend on the date of Easter Sunday.

You can read more about the rules in [Fasting Rules](https://github.com/ddppddpp/bgchof/blob/main/docs/FASTINGRULES.md).

The site also represents an excercise in software development and application architecture.


## Why Fast?
Abstaining from certain types of food for various periods of time has been a tradition for thousands of years in the country where I'm living. It results in a balanced diet which should be healthier than the diet of the modern day human.

The spiritual fast goes way deeper in the figsht against sin and the purification of the soul, but is beyond the scope of this site.

In any case, should you consider fastting, please consult with a dietitian and/or a spiritual guide first.


## Technology
The web application is built on three main parts - the frontend, an API and a module for calendar calculations.

### Calendar Calculations
At the heart of the site is bgchof - a python module for calendar calculations, published on [GitHub](https://github.com/ddppddpp/bgchof). It can be installed in any environment that runs python 3 and has a rudimentary Command Line Interface.

In theory, bgchof should be capable of calculating the fasting calendar for centuries ahead.

### FrontEnd
The web frontend is based on React and hosted on [GitHub Pages](https://pages.github.com) in a public repository (so, ultimately on Microsoft Azure). Although not my favorite choice, React has a huge potential of bridging web and mobile, which I needed to explore, so it was a natural choice.

The calendar picker is using the great [React Modern Calendar Datepicker](https://kiarash-z.github.io/react-modern-calendar-datepicker/).

For Bulgarian/English localization I'm using [react-i18next](https://react.i18next.com).


The source code itself is in a private GitHub repoistory (mainly because I'm not quite happy with the quality). The deploy script I'm using builds the static content and cross-publishes it in the public repository, based on [this](https://github.com/gitname/react-gh-pages) turorial.
### API Backend
Each time a user clicks on a date, a call is made to an external API. 
The API is running in a serverless [AWS Lambda Function](https://aws.amazon.com/lambda/) (which means a new environment is spun-up for each request). Serverless is a model that seems to be applicable to web services/RESTful APIs because of the on-demand resource up/down-scaling without bothering with the details of the underlying infrastructure. And AWS Lambda curently has a particularly nice [Freemium](https://aws.amazon.com/lambda/pricing/) tier.

The API is based on the [FastAPI](https://fastapi.tiangolo.com) framework - at the time of research it was the simplest, most powerful and gratest fun to code with. There are tons of great resources on how to start with FastAPI in the AWS Lambda context, like this[ article](https://medium.com/analytics-vidhya/python-fastapi-and-aws-lambda-container-3e524c586f01) or this [2-part series](https://towardsdatascience.com/fastapi-aws-robust-api-part-1-f67ae47390f9).

The source code is published in the public GitHub repository [fastingWebAPI](https://github.com/ddppddpp/fastingWebAPI). Each time a PR is merged, a workflow action spins-up a (ubuntu-latest) Runner on Azure, builds a docker container image in it, installs the latest version of [bgchof](https://github.com/ddppddpp/bgchof), tags the image, uploads it to a AWS Elastic Container Registry and applies the image to the Lambda Function. Most of the action is based on this [tutorial](https://aws.plainenglish.io/build-a-docker-image-and-publish-it-to-aws-ecr-using-github-actions-f20accd774c3).



## More Info