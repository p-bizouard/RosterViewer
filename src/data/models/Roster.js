/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const Roster = Model.define(
  'Roster',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },

    key: {
      type: DataType.STRING(255),
      allowNull: false,
      unique: true,
    },

    rosz: {
      type: DataType.BLOB('long'),
    },
  },
  {
    indexes: [{ fields: ['key'] }],
  },
);

export default Roster;
