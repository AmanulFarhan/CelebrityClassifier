from icrawler.builtin import BingImageCrawler

actors = {
    'Tovino': 'Tovino Close Up Face',
    'Dulquer': 'Dulquer Close Up Face',
    'Prithviraj': 'Prithviraj Close Up Face',
    'Nivin': 'Nivin Close Up Face',
    'Dileep': 'Dileep Close Up Face',
}

crawler = BingImageCrawler(storage={'root_dir': 'dataset/zoro'})

for actor, query in actors.items():
    crawler = BingImageCrawler(
        storage = {'root_dir': f'dataset/{actor}'}
    )
    crawler.crawl(
        keyword=query,
        max_num=35
    )