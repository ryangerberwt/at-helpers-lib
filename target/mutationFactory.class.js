class MutationFactory {
  targetNode
  config
  mutationsList
  observer
  //We should actually set this in our helper script. But let's just define an example for now
  logic = {
    conditions: {
      a: {
        expression: function (_mutation) {
          if (
            _mutation.target.className.indexOf('navScrollVisible') > 0 &&
            $('.lowerZIndex') !== undefined &&
            $('.lowerZindex').length > 0
          ) {
            $('.guxFloatingDiv').addClass('lowerZIndex')
          }
        },
        b: {
          expression: function (_mutation) {
            if (
              _mutation.target.className.indexOf('navScrollVisible') < 0 &&
              ($('.lowerZIndex') !== undefined || $('.lowerZIndex').length > 0)
            ) {
              $('.guxFloatingDiv').removeClass('lowerZIndex')
            }
          }
        }
      }
    }
  }

  initObsever = (_targetNode, _config, _observer) => {
    return _observer.observe(_targetNode, _config)
  }

  initFactory = (targetNode, config, mutationsList, observer) => {
    this.targetNode = targetNode
    this.config = config
    this.mutationsList = mutationsList
    this.observer = observer
  }

  createCallback = () => {
    return function () {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          if (mutation.attributeName === 'class') {
            addLogic()
          }
        }
      }
    }
  }

  addLogic = () => {
    for (const condition of logic.conditions) {
      return condition.expression
    }
  }
}
