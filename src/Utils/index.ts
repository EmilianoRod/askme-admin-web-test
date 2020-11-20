/* eslint-disable no-unused-expressions */

import { getCompanyBranches_company_branches } from 'api/__generated__/getCompanyBranches';

export const isOptimistic = (id: string) => id.startsWith('optimistic');

declare global {
  interface SelectedAreasInterface {
    name: string;
    ids: string[];
  }
}

export const emailMatch = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isAlreadySelected = (
  id: string,
  alreadyselectedBranchAreas: {
    branches: getCompanyBranches_company_branches[];
    areas: SelectedAreasInterface[];
  }[],
) =>
  alreadyselectedBranchAreas.some(({ areas }) =>
    areas?.some(({ ids }) => ids.some((idArea) => idArea === id)),
  );

const canAddArea = (
  checkNotSelected: boolean,
  id: string,
  selectedBranchAreas: {
    branches: getCompanyBranches_company_branches[];
    areas: SelectedAreasInterface[];
  }[],
) => checkNotSelected || !isAlreadySelected(id, selectedBranchAreas);

export const areEqual = (str1: string, str2: string) => str1.toUpperCase() === str2.toUpperCase();

export const filterAreas = (
  selectedBranchOffice: getCompanyBranches_company_branches[],
  alreadyselectedBranchAreas: {
    branches: getCompanyBranches_company_branches[];
    areas: SelectedAreasInterface[];
  }[],
  checkNotSelected: boolean,
) => {
  const filteredAreas: SelectedAreasInterface[] = [];

  if (selectedBranchOffice.length) {
    selectedBranchOffice[0].areas?.forEach(({ id, name }) => {
      if (canAddArea(checkNotSelected, id, alreadyselectedBranchAreas)) {
        let isRepeated: boolean | undefined = true;
        for (let index = 1; index < selectedBranchOffice.length; index += 1) {
          isRepeated =
            isRepeated &&
            selectedBranchOffice[index].areas?.some(({ name: repeatedName, id: repeatedId }) => {
              return (
                areEqual(repeatedName, name) &&
                canAddArea(checkNotSelected, repeatedId, alreadyselectedBranchAreas)
              );
            });
        }
        if (isRepeated) {
          filteredAreas.push({ name, ids: [id] });
          for (let index = 1; index < selectedBranchOffice.length; index += 1) {
            selectedBranchOffice[index].areas?.forEach(({ name: areaName, id: areaId }) => {
              if (areEqual(areaName, name))
                filteredAreas.forEach((filteredArea) => {
                  if (filteredArea.name === name) filteredArea.ids.push(areaId);
                });
            });
          }
        }
      }
    });
  }
  return filteredAreas;
};

export const getEmail = () => localStorage.getItem('email');
export const setEmail = (email: string) => localStorage.setItem('email', email);
