'use strict';

const { handleAssistantEvent } = require('../lib/assistant-core');

exports.handler = async (event) => handleAssistantEvent(event);
