require 'data_mapper'

DATABASE_ADAPTER  = 'mysql'
DATABASE_USER     = 'tluntercom'
DATABASE_PASSWORD = ''
DATABASE_HOST     = 'localhost'
DATABASE_DB       = 'tluntercom'
DATABASE_TEST     = 'test_tluntercom'

DataMapper.setup(:default, {
  adapter: DATABASE_ADAPTER,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  host: DATABASE_HOST,
  database: DATABASE_DB
})
