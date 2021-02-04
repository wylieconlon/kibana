/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { DEFAULT_INDEX_PATTERN } from '../../../../common/constants';
import { DocValueFields } from '../../../../common/search_strategy';
import { BrowserFields } from '../../../../common/search_strategy/index_fields';

export const mocksSource = {
  indexFields: [
    {
      category: 'base',
      description:
        'Date/time when the event originated. For log events this is the date/time when the event was generated, and not when it was read. Required field for all events.',
      example: '2016-05-23T08:05:34.853Z',
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: '@timestamp',
      searchable: true,
      type: 'date',
      aggregatable: true,
    },
    {
      category: 'agent',
      description:
        'Ephemeral identifier of this agent (if one exists). This id normally changes across restarts, but `agent.id` does not.',
      example: '8a4f500f',
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'agent.ephemeral_id',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      category: 'agent',
      description: null,
      example: null,
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'agent.hostname',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      category: 'agent',
      description:
        'Unique identifier of this agent (if one exists). Example: For Beats this would be beat.id.',
      example: '8a4f500d',
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'agent.id',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      category: 'agent',
      description:
        'Name of the agent. This is a name that can be given to an agent. This can be helpful if for example two Filebeat instances are running on the same host but a human readable separation is needed on which Filebeat instance data is coming from. If no name is given, the name is often left empty.',
      example: 'foo',
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'agent.name',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      category: 'auditd',
      description: null,
      example: null,
      format: '',
      indexes: ['auditbeat'],
      name: 'auditd.data.a0',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      category: 'auditd',
      description: null,
      example: null,
      format: '',
      indexes: ['auditbeat'],
      name: 'auditd.data.a1',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      category: 'auditd',
      description: null,
      example: null,
      format: '',
      indexes: ['auditbeat'],
      name: 'auditd.data.a2',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      category: 'client',
      description:
        'Some event client addresses are defined ambiguously. The event will sometimes list an IP, a domain or a unix socket.  You should always store the raw address in the `.address` field. Then it should be duplicated to `.ip` or `.domain`, depending on which one it is.',
      example: null,
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'client.address',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      category: 'client',
      description: 'Bytes sent from the client to the server.',
      example: '184',
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'client.bytes',
      searchable: true,
      type: 'number',
      aggregatable: true,
    },
    {
      category: 'client',
      description: 'Client domain.',
      example: null,
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'client.domain',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      category: 'client',
      description: 'Country ISO code.',
      example: 'CA',
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'client.geo.country_iso_code',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      category: 'cloud',
      description:
        'The cloud account or organization id used to identify different entities in a multi-tenant environment. Examples: AWS account id, Google Cloud ORG Id, or other unique identifier.',
      example: '666777888999',
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'cloud.account.id',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      category: 'cloud',
      description: 'Availability zone in which this host is running.',
      example: 'us-east-1c',
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'cloud.availability_zone',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      category: 'container',
      description: 'Unique container id.',
      example: null,
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'container.id',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      category: 'container',
      description: 'Name of the image the container was built on.',
      example: null,
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'container.image.name',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      category: 'container',
      description: 'Container image tag.',
      example: null,
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'container.image.tag',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      category: 'destination',
      description:
        'Some event destination addresses are defined ambiguously. The event will sometimes list an IP, a domain or a unix socket.  You should always store the raw address in the `.address` field. Then it should be duplicated to `.ip` or `.domain`, depending on which one it is.',
      example: null,
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'destination.address',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      category: 'destination',
      description: 'Bytes sent from the destination to the source.',
      example: '184',
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'destination.bytes',
      searchable: true,
      type: 'number',
      aggregatable: true,
    },
    {
      category: 'destination',
      description: 'Destination domain.',
      example: null,
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'destination.domain',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      aggregatable: true,
      category: 'destination',
      description: 'IP address of the destination. Can be one or multiple IPv4 or IPv6 addresses.',
      example: '',
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'destination.ip',
      searchable: true,
      type: 'ip',
    },
    {
      aggregatable: true,
      category: 'destination',
      description: 'Port of the destination.',
      example: '',
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'destination.port',
      searchable: true,
      type: 'long',
    },
    {
      aggregatable: true,
      category: 'source',
      description: 'IP address of the source. Can be one or multiple IPv4 or IPv6 addresses.',
      example: '',
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'source.ip',
      searchable: true,
      type: 'ip',
    },
    {
      aggregatable: true,
      category: 'source',
      description: 'Port of the source.',
      example: '',
      format: '',
      indexes: ['auditbeat', 'filebeat', 'packetbeat'],
      name: 'source.port',
      searchable: true,
      type: 'long',
    },
    {
      aggregatable: true,
      category: 'event',
      description:
        'event.end contains the date when the event ended or when the activity was last observed.',
      example: null,
      format: '',
      indexes: DEFAULT_INDEX_PATTERN,
      name: 'event.end',
      searchable: true,
      type: 'date',
    },
  ],
};

export const mockIndexFields = [
  { aggregatable: true, name: '@timestamp', searchable: true, type: 'date' },
  { aggregatable: true, name: 'agent.ephemeral_id', searchable: true, type: 'string' },
  { aggregatable: true, name: 'agent.hostname', searchable: true, type: 'string' },
  { aggregatable: true, name: 'agent.id', searchable: true, type: 'string' },
  { aggregatable: true, name: 'agent.name', searchable: true, type: 'string' },
  { aggregatable: true, name: 'auditd.data.a0', searchable: true, type: 'string' },
  { aggregatable: true, name: 'auditd.data.a1', searchable: true, type: 'string' },
  { aggregatable: true, name: 'auditd.data.a2', searchable: true, type: 'string' },
  { aggregatable: true, name: 'client.address', searchable: true, type: 'string' },
  { aggregatable: true, name: 'client.bytes', searchable: true, type: 'number' },
  { aggregatable: true, name: 'client.domain', searchable: true, type: 'string' },
  { aggregatable: true, name: 'client.geo.country_iso_code', searchable: true, type: 'string' },
  { aggregatable: true, name: 'cloud.account.id', searchable: true, type: 'string' },
  { aggregatable: true, name: 'cloud.availability_zone', searchable: true, type: 'string' },
  { aggregatable: true, name: 'container.id', searchable: true, type: 'string' },
  { aggregatable: true, name: 'container.image.name', searchable: true, type: 'string' },
  { aggregatable: true, name: 'container.image.tag', searchable: true, type: 'string' },
  { aggregatable: true, name: 'destination.address', searchable: true, type: 'string' },
  { aggregatable: true, name: 'destination.bytes', searchable: true, type: 'number' },
  { aggregatable: true, name: 'destination.domain', searchable: true, type: 'string' },
  { aggregatable: true, name: 'destination.ip', searchable: true, type: 'ip' },
  { aggregatable: true, name: 'destination.port', searchable: true, type: 'long' },
  { aggregatable: true, name: 'source.ip', searchable: true, type: 'ip' },
  { aggregatable: true, name: 'source.port', searchable: true, type: 'long' },
  { aggregatable: true, name: 'event.end', searchable: true, type: 'date' },
];

export const mockBrowserFields: BrowserFields = {
  agent: {
    fields: {
      'agent.ephemeral_id': {
        aggregatable: true,
        category: 'agent',
        description:
          'Ephemeral identifier of this agent (if one exists). This id normally changes across restarts, but `agent.id` does not.',
        example: '8a4f500f',
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'agent.ephemeral_id',
        searchable: true,
        type: 'string',
      },
      'agent.hostname': {
        aggregatable: true,
        category: 'agent',
        description: null,
        example: null,
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'agent.hostname',
        searchable: true,
        type: 'string',
      },
      'agent.id': {
        aggregatable: true,
        category: 'agent',
        description:
          'Unique identifier of this agent (if one exists). Example: For Beats this would be beat.id.',
        example: '8a4f500d',
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'agent.id',
        searchable: true,
        type: 'string',
      },
      'agent.name': {
        aggregatable: true,
        category: 'agent',
        description:
          'Name of the agent. This is a name that can be given to an agent. This can be helpful if for example two Filebeat instances are running on the same host but a human readable separation is needed on which Filebeat instance data is coming from. If no name is given, the name is often left empty.',
        example: 'foo',
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'agent.name',
        searchable: true,
        type: 'string',
      },
    },
  },
  auditd: {
    fields: {
      'auditd.data.a0': {
        aggregatable: true,
        category: 'auditd',
        description: null,
        example: null,
        format: '',
        indexes: ['auditbeat'],
        name: 'auditd.data.a0',
        searchable: true,
        type: 'string',
      },
      'auditd.data.a1': {
        aggregatable: true,
        category: 'auditd',
        description: null,
        example: null,
        format: '',
        indexes: ['auditbeat'],
        name: 'auditd.data.a1',
        searchable: true,
        type: 'string',
      },
      'auditd.data.a2': {
        aggregatable: true,
        category: 'auditd',
        description: null,
        example: null,
        format: '',
        indexes: ['auditbeat'],
        name: 'auditd.data.a2',
        searchable: true,
        type: 'string',
      },
    },
  },
  base: {
    fields: {
      '@timestamp': {
        aggregatable: true,
        category: 'base',
        description:
          'Date/time when the event originated. For log events this is the date/time when the event was generated, and not when it was read. Required field for all events.',
        example: '2016-05-23T08:05:34.853Z',
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: '@timestamp',
        searchable: true,
        type: 'date',
      },
    },
  },
  client: {
    fields: {
      'client.address': {
        aggregatable: true,
        category: 'client',
        description:
          'Some event client addresses are defined ambiguously. The event will sometimes list an IP, a domain or a unix socket.  You should always store the raw address in the `.address` field. Then it should be duplicated to `.ip` or `.domain`, depending on which one it is.',
        example: null,
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'client.address',
        searchable: true,
        type: 'string',
      },
      'client.bytes': {
        aggregatable: true,
        category: 'client',
        description: 'Bytes sent from the client to the server.',
        example: '184',
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'client.bytes',
        searchable: true,
        type: 'number',
      },
      'client.domain': {
        aggregatable: true,
        category: 'client',
        description: 'Client domain.',
        example: null,
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'client.domain',
        searchable: true,
        type: 'string',
      },
      'client.geo.country_iso_code': {
        aggregatable: true,
        category: 'client',
        description: 'Country ISO code.',
        example: 'CA',
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'client.geo.country_iso_code',
        searchable: true,
        type: 'string',
      },
    },
  },
  cloud: {
    fields: {
      'cloud.account.id': {
        aggregatable: true,
        category: 'cloud',
        description:
          'The cloud account or organization id used to identify different entities in a multi-tenant environment. Examples: AWS account id, Google Cloud ORG Id, or other unique identifier.',
        example: '666777888999',
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'cloud.account.id',
        searchable: true,
        type: 'string',
      },
      'cloud.availability_zone': {
        aggregatable: true,
        category: 'cloud',
        description: 'Availability zone in which this host is running.',
        example: 'us-east-1c',
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'cloud.availability_zone',
        searchable: true,
        type: 'string',
      },
    },
  },
  container: {
    fields: {
      'container.id': {
        aggregatable: true,
        category: 'container',
        description: 'Unique container id.',
        example: null,
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'container.id',
        searchable: true,
        type: 'string',
      },
      'container.image.name': {
        aggregatable: true,
        category: 'container',
        description: 'Name of the image the container was built on.',
        example: null,
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'container.image.name',
        searchable: true,
        type: 'string',
      },
      'container.image.tag': {
        aggregatable: true,
        category: 'container',
        description: 'Container image tag.',
        example: null,
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'container.image.tag',
        searchable: true,
        type: 'string',
      },
    },
  },
  destination: {
    fields: {
      'destination.address': {
        aggregatable: true,
        category: 'destination',
        description:
          'Some event destination addresses are defined ambiguously. The event will sometimes list an IP, a domain or a unix socket.  You should always store the raw address in the `.address` field. Then it should be duplicated to `.ip` or `.domain`, depending on which one it is.',
        example: null,
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'destination.address',
        searchable: true,
        type: 'string',
      },
      'destination.bytes': {
        aggregatable: true,
        category: 'destination',
        description: 'Bytes sent from the destination to the source.',
        example: '184',
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'destination.bytes',
        searchable: true,
        type: 'number',
      },
      'destination.domain': {
        aggregatable: true,
        category: 'destination',
        description: 'Destination domain.',
        example: null,
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'destination.domain',
        searchable: true,
        type: 'string',
      },
      'destination.ip': {
        aggregatable: true,
        category: 'destination',
        description:
          'IP address of the destination. Can be one or multiple IPv4 or IPv6 addresses.',
        example: '',
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'destination.ip',
        searchable: true,
        type: 'ip',
      },
      'destination.port': {
        aggregatable: true,
        category: 'destination',
        description: 'Port of the destination.',
        example: '',
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'destination.port',
        searchable: true,
        type: 'long',
      },
    },
  },
  event: {
    fields: {
      'event.end': {
        category: 'event',
        description:
          'event.end contains the date when the event ended or when the activity was last observed.',
        example: null,
        format: '',
        indexes: DEFAULT_INDEX_PATTERN,
        name: 'event.end',
        searchable: true,
        type: 'date',
        aggregatable: true,
      },
    },
  },
  source: {
    fields: {
      'source.ip': {
        aggregatable: true,
        category: 'source',
        description: 'IP address of the source. Can be one or multiple IPv4 or IPv6 addresses.',
        example: '',
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'source.ip',
        searchable: true,
        type: 'ip',
      },
      'source.port': {
        aggregatable: true,
        category: 'source',
        description: 'Port of the source.',
        example: '',
        format: '',
        indexes: ['auditbeat', 'filebeat', 'packetbeat'],
        name: 'source.port',
        searchable: true,
        type: 'long',
      },
    },
  },
};

export const mockDocValueFields: DocValueFields[] = [
  {
    field: '@timestamp',
    format: 'date_time',
  },
  {
    field: 'event.end',
    format: 'date_time',
  },
];
