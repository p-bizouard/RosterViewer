import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import MyFormattedMessage from '../MyFormattedMessage';

export default class UnitAbilitiesTable extends Component {
  renderAbilities(characteristicName) {
    let abilities = [];

    if (this.props.unit.selections) {
      abilities = abilities
        .concat(
          this.props.unit.selections[0].selection.map(model => {
            let modelAbilities = [];

            if (model.profiles)
              modelAbilities = modelAbilities
                .concat(
                  model.profiles[0].profile
                    .filter(
                      profile =>
                        profile.$.typeName === 'Abilities' ||
                        profile.$.typeName === 'Ability',
                    )
                    .map(modelAbility => ({
                      id: modelAbility.$.id,
                      name: modelAbility.$.name,
                      description: modelAbility.characteristics[0].characteristic.find(
                        characteristic =>
                          characteristic.$.name === characteristicName,
                      )._,
                    })),
                )
                .flat();

            if (model.selections) {
              modelAbilities = modelAbilities
                .concat(
                  model.selections[0].selection
                    .filter(upgrade => upgrade.$.type === 'upgrade')
                    .map(upgrade => {
                      if (!upgrade.profiles) return null;

                      return upgrade.profiles[0].profile
                        .filter(
                          upgradeAbility =>
                            upgradeAbility.$.typeName === 'Abilities' ||
                            upgradeAbility.$.typeName === 'Ability',
                        )
                        .map(upgradeAbility => ({
                          id: upgradeAbility.$.id,
                          name: upgradeAbility.$.name,
                          description: upgradeAbility.characteristics[0].characteristic.find(
                            characteristic =>
                              characteristic.$.name === characteristicName,
                          )._,
                        }));
                      // { id: modelAbility.$.id, name: modelAbility.$.name, description: modelAbility.characteristics[0].characteristic.find(characteristic => characteristic.$.name === characteristicName)._ }
                    }),
                )
                .flat();
            }

            return modelAbilities;
          }),
        )
        .flat();
    }

    if (this.props.unit.profiles) {
      abilities = abilities
        .concat(
          this.props.unit.profiles[0].profile
            .filter(
              profile =>
                profile.$.typeName === 'Abilities' ||
                profile.$.typeName === 'Ability',
            )
            .map(modelAbility => ({
              id: modelAbility.$.id,
              name: modelAbility.$.name,
              description: modelAbility.characteristics[0].characteristic.find(
                characteristic => characteristic.$.name === characteristicName,
              )._,
            })),
        )
        .flat();
    }

    abilities = abilities.flat().filter(n => n);

    const dedupAbilities = Array.from(new Set(abilities.map(a => a.name))).map(
      name => abilities.find(a => a.name === name),
    );

    return dedupAbilities.map(ability => (
      <tr key={`ability_${this.props.unit.$.id}_${ability.id}`}>
        <td>
          <MyFormattedMessage
            prefix="unit.ability_name"
            message={ability.name}
          />
        </td>
        <td>
          <MyFormattedMessage
            prefix="unit.ability_description"
            message={ability.name}
            defaultMessage={ability.description}
          />
        </td>
      </tr>
    ));
  }

  render() {
    const abilities = this.renderAbilities('Description');

    return (
      <div className="table-responsive">
        {abilities.length ? (
          <table className="table-abilities table table-striped table-bordered table-hover table-sm">
            <thead>
              <tr>
                <th>
                  <FormattedMessage
                    id="DatasheetTemplate.table.ability"
                    defaultMessage="Ability"
                  />
                </th>
                <th>
                  <FormattedMessage
                    id="DatasheetTemplate.table.description"
                    defaultMessage="Description"
                  />
                </th>
              </tr>
            </thead>
            <tbody>{abilities}</tbody>
          </table>
        ) : (
          ''
        )}
      </div>
    );
  }
}
