import { join } from 'node:path';
import { list, option, report, selectors, value } from '@cairul/plugin-kit/runner';
import { junit } from '@cairul/plugin-kit/reports';

export default {
  command: ['./vendor/bin/phpunit'],
  select: selectors({ paths: list, suites: list, groups: list, namePattern: value }),
  build({ paths, suites, groups, namePattern }, temp) {
    return {
      args: [
        '--log-junit',
        join(temp, 'result.xml'),
        ...option('--testsuite', suites?.join(',')),
        ...option('--group', groups?.join(',')),
        ...option('--filter', namePattern),
        ...(paths ?? []),
      ],
      read: report('result.xml', junit),
    };
  },
};
