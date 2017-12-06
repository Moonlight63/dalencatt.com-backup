<?php
namespace Grav\Theme;

use Gantry\Framework\Gantry;
use Gantry\Framework\Theme as GantryTheme;
use Grav\Common\Theme;
use RocketTheme\Toolbox\Event\Event;
use RocketTheme\Toolbox\ResourceLocator\UniformResourceLocator;

class DC_Cascade extends Theme
{
    public $gantry = '5.4.0';

    /**
     * @var GantryTheme
     */
    protected $theme;

    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            'onMarkdownInitialized' => ['onMarkdownInitialized', 0],
            'onThemeInitialized' => ['onThemeInitialized', 0]
        ];
    }

    public function onMarkdownInitialized(Event $event)
    {
        $markdown = $event['markdown'];
        $markdown->addBlockType('!', 'Alerts', true, false, 0);

        $markdown->blockAlerts = function($Line) {

            if (preg_match('/^(\!{1,})+(?:\s?\{([^\}]*)\}\s?)?(?:\s?\[(.*)\]\s?)?(.*)/', $Line['text'], $matches))
            {
                $level = strlen($matches[1]) - 1;
                $class = ltrim($matches[2]);
                $label = ltrim($matches[3]);
                $text = ltrim($matches[4]);

                $Element = [
                    'name' => 'p',
                    'handler' => 'line',
                    'attributes' => [
                        'class' => 'md-alert-line'
                    ],
                    'text' => $text,
                ];
                $Attributes = [
                    'class' => 'md-alerts ' . ((0 < strlen($label)) ? 'md-alerts-notice ' : '') . ((0 < strlen($class)) ? 'md-alerts-override-'.$class : 'md-alerts-level-'.$level)
                ];

                $Container = [
                    'name' => 'div',
                    'handler' => 'elements',
                    'attributes' => [
                        'class' => 'md-alert-container'
                    ],
                    'text' => [ $Element ],
                ];

                $Elements = [ $Container ];

                // ignore the label if empty
                if (0 < strlen($label)) {
                    $Label = [
                        'name' => 'div',
                        'handler' => 'line',
                        'attributes' => [
                            'class' => 'md-alert-label'
                        ],
                        'text' => $label,
                    ];

                    array_unshift($Elements, $Label);
                }
                $Block = [
                    'element' => [
                        'name' => 'div',
                        'handler' => 'elements',
                        'attributes' => $Attributes,
                        'text' => $Elements,
                    ]
                ];

                return $Block;
            }
        };
        $markdown->blockAlertsContinue = function($Line, array $Block) {
            if (isset($Block['interrupted']))
            {
                return;
            }
            if ($Line['text'][0] === '!' and preg_match('/^(\!{1,})+(?:\s)?(.*)/', $Line['text'], $matches))
            {

                $text = ltrim($matches[2]);

                $Element = [
                    'name' => 'p',
                    'handler' => 'line',
                    'attributes' => [
                        'class' => 'md-alert-line'
                    ],
                    'text' => $text,
                ];

                $Block['element']['text'][count($Block['element']['text'])-1]['text'][] = $Element;

                return $Block;
            }
        };
    }

    public function onThemeInitialized()
    {

        if (defined('GRAV_CLI') && GRAV_CLI) {
            return;
        }

        /** @var UniformResourceLocator $locator */
        $locator = $this->grav['locator'];
        $path = $locator('theme://');
        $name = $this->name;

        if (!class_exists('\Gantry5\Loader')) {
            if ($this->isAdmin()) {
                $messages = $this->grav['messages'];
                $messages->add('Please enable Gantry 5 plugin in order to use current theme!', 'error');
                return;
            } else {
                throw new \LogicException('Please install and enable Gantry 5 Framework plugin!');
            }
        }


        // Setup Gantry 5 Framework or throw exception.
        \Gantry5\Loader::setup();

        // Get Gantry instance.
        $gantry = Gantry::instance();

        // Set the theme path from Grav variable.
        $gantry['theme.path'] = $path;
        $gantry['theme.name'] = $name;

        // Define the template.
        require $locator('theme://includes/theme.php');

        // Define Gantry services.
        $gantry['theme'] = function ($c) {
            return new \Gantry\Theme\Cascade($c['theme.path'], $c['theme.name']);
        };
    }
}
