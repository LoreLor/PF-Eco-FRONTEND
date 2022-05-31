import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function Carrousel(img) {

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = img.img.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div>
    <Box sx={{ maxWidth: 500, flexGrow: 1, marginTop: 5, marginBottom: 8}}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        >
        {
          img.img.map((i, index) => (
            <div key={index}>
              {
                Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                      sx={{
                        display: 'block',
                        maxWidth: 500,
                        maxHeight:400,
                        overflow: 'hidden',
                        width: '100%',
                        objectFit:'contain',
                        alignItems:'center'
                      }}
                      src={i}
                      alt={""}
                      />
                      ) : null
                    }
            </div>
          ))
        }
      </AutoPlaySwipeableViews>
      </Box>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
          size="small"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
                )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
                )}
              Back
          </Button>
        }
        />
        </div>
  );
}

