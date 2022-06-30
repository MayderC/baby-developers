

export default class Mapper {

  /**
 * @template from base object - firts
 * @template to final object - second
 * @param from
 * @return  (to) second param generic
 */


  static Map<from extends Object, to>(object: from): to{

   
    const final : to = Object.create({})

    return final
  }
}



