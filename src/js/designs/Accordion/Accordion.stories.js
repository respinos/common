import Accordion from './index.svelte';

import SingleAccordionPanelArgs from './fixtures/SingleAccordionPanel.js';
import IndependentAccordionPanelsArgs from './fixtures/IndependentAccordionPanels.js';
import MultipleAccordionsArgs from './fixtures/MultipleAccordions.js';
import LargeAccordionInFixedViewArgs from './fixtures/LargeAccordionInFixedView.js';

export default {
  title: 'Designs/Accordion',
  component: Accordion,
};


export const SingleAccordionPanel = {
  args: SingleAccordionPanelArgs
};

export const IndependentAccordionPanels = {
  args: IndependentAccordionPanelsArgs
};

export const MultipleAccordions = {
  args: MultipleAccordionsArgs
};

export const LargeAccordionInFixedView = {
  args: LargeAccordionInFixedViewArgs
};
