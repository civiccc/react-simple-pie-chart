const context = require.context('./spec', true, /_spec\.jsx?$/);
context.keys().forEach(context);
